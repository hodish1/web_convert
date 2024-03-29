﻿using System.Text;
using seconv.libse.Common;
using seconv.libse.SubtitleFormats;

namespace seconv.libse.Interfaces
{
    public interface IFixCallbacks : IDoSpell
    {
        bool AllowFix(Paragraph p, string action);
        void AddFixToListView(Paragraph p, string action, string before, string after);
        void AddFixToListView(Paragraph p, string action, string before, string after, bool isChecked);
        void LogStatus(string sender, string message);
        void LogStatus(string sender, string message, bool isImportant);
        void UpdateFixStatus(int fixes, string message);
        bool IsName(string candidate);
        HashSet<string> GetAbbreviations();
        void AddToTotalErrors(int count);
        void AddToDeleteIndices(int index);
        SubtitleFormat Format { get; }
        Encoding Encoding { get; }
        string Language { get; }
    }
}
