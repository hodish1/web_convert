const { exec } = require("child_process");
const fs = require("fs").promises;
const { MESSAGE_LOG_START_PROCESS, MESSAGE_LOG_FAILURE, MESSAGE_LOG_SUCCESS } = require("./constants");
const { CLI_FORMAT_FILE_FORMAT_MAP } = require("./formats");

async function _convert(convertData) {
  const { originalPath, cliFormat } = convertData;
  const bashCommand = `sh convert.sh ${originalPath} ${cliFormat}`;
  return new Promise((resolve, reject) => {
    try {
      exec(bashCommand, (error, stdout, stderr) => {
        console.info(MESSAGE_LOG_START_PROCESS, { stdout, stderr });
        if (error !== null) {
          console.error(MESSAGE_LOG_FAILURE, { stdout, stderr });
          reject(MESSAGE_LOG_FAILURE);
        } else {
          console.log(MESSAGE_LOG_SUCCESS, { stdout, stderr });
          resolve();
        }
      });
    } catch (error) {
      console.error(MESSAGE_LOG_FAILURE, { stdout, stderr });
      reject(MESSAGE_LOG_FAILURE);
    }
  });
}

function _extractConvertData(file, format) {
  const [fileNameNoExtention] = file.path.split(".");
  const targetPath = fileNameNoExtention + "." + CLI_FORMAT_FILE_FORMAT_MAP[format];
  const convertData = {
    originalPath: file.path,
    targetPath,
    cliFormat: format,
  };
  return convertData;
}

async function convertFlow(req, res) {
  try {
    const convertData = _extractConvertData(req.file, req.body.format);
    await _convert(convertData);
    const data = await fs.readFile(convertData.targetPath);
    res.status(200).json({ success: true, subtitles: data.toString(), fileName: convertData.targetPath });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ success: false, error });
  }
}

module.exports = { convertFlow };
