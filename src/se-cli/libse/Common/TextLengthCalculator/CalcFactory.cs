﻿namespace seconv.libse.Common.TextLengthCalculator
{
    public static class CalcFactory
    {
        public static List<ICalcLength> Calculators = new List<ICalcLength>
        {
            new CalcAll(),
            new CalcNoSpaceCpsOnly(),
            new CalcNoSpace(),
            new CalcCjk(),
            new CalcCjkNoSpace(),
            new CalcIgnoreArabicDiacritics(),
            new CalcIgnoreArabicDiacriticsNoSpace(),
            new CalcNoSpaceOrPunctuation(),
            new CalcNoSpaceOrPunctuationCpsOnly(),
        };

        public static ICalcLength MakeCalculator(string strategy)
        {
            var c = Calculators.FirstOrDefault(calculator => calculator.GetType().Name == strategy);
            return c ?? new CalcAll();
        }
    }
}
