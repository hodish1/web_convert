const { exec } = require("child_process");
const fs = require("fs").promises;

const MESSAGE_LOG_START_PROCESS = "Run convert script";
const MESSAGE_LOG_SUCCESS = "Convert successfully";
const MESSAGE_LOG_FAILURE = "Convert failed";

async function _convert(convertData) {
  const { originalPath, targetFormat } = convertData;
  const bashCommand = `sh convert.sh ${originalPath} ${targetFormat}`;
  return new Promise((resolve, reject) => {
    try {
      exec(bashCommand, (error, stdout, stderr) => {
        console.info(MESSAGE_LOG_START_PROCESS, { stdout, stderr });
        if (error !== null) {
          console.error(MESSAGE_LOG_FAILURE, { stdout, stderr });
          reject("Failed to convert file");
        } else {
          console.log(MESSAGE_LOG_SUCCESS, { stdout, stderr });
          resolve();
        }
      });
    } catch (error) {
      console.error(MESSAGE_LOG_FAILURE, { stdout, stderr });
      reject("Failed to convert file");
    }
  });
}

function _extractConvertData(file, format) {
  const [fileNameNoExtention] = file.path.split(".");
  const targetPath = fileNameNoExtention + "." + format;
  const convertData = {
    originalPath: file.path,
    targetPath,
    targetFormat: format,
  };
  return convertData;
}

async function convertFlow(req, res, next) {
  try {
    const convertData = _extractConvertData(req.file, req.body.format);
    await _convert(convertData);
    const data = await fs.readFile(convertData.targetPath);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error({ error });
    res.status(500).json({ success: false, error });
  }
}

module.exports = { convertFlow };
