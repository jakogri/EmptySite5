var nconf = require('nconf');
var mongoose = require('mongoose');
var path = require('path');
nconf.argv()
    .env()
    .file({file: path.join(__dirname, 'config.json')});

exports.GetDescriptionArray = function (PositionArray, InStr)
{
    var DescriptionArray = [];
    var i, j;
    var test_value;
    for (i = 0; i <= PositionArray.length; i++) DescriptionArray[i] = '';
    for (i = 0; i <= PositionArray[PositionArray.length - 1]; i++)
    {
        test_value = InStr.substring(0, InStr.indexOf(',')).trim();
        for (j = 0; j < PositionArray.length; j++)
        {
            if (i == PositionArray[j]) DescriptionArray[j] = test_value;
        }
        InStr = InStr.substring(InStr.indexOf(',') + 1);
    };
    return DescriptionArray;
};


exports.GetPriceArray = function (AgeArray, PositionArray, InStr)
{
    var PriceArray = [];
    var i, j;
    var test_value;
    for (i = 0; i <= 99; i++) PriceArray[i] = 0;
    for (i = 0; i <= PositionArray[PositionArray.length - 1]; i++)
        InStr = InStr.substring(InStr.indexOf(',') + 1);
    j = 0;
    for (i = 0; i < AgeArray.length; i++)
    {
        if (InStr.indexOf(',') == -1)
        {
            this.SetArrayValue(PriceArray, AgeArray[i], InStr.trim());
        }
        else
        {
            test_value = InStr.substring(0, InStr.indexOf(',')).trim();
            this.SetArrayValue(PriceArray, AgeArray[i], test_value);
            InStr = InStr.substring(InStr.indexOf(',') + 1);
        };
    };
    return (PriceArray);
};

exports.GetAgeArray = function (InStr)
{
    var age_array = [];
    var i;
    var TestStr;
    var j = 0;
    TestStr = InStr.substring(InStr.indexOf('Rate Type') + 1);
    TestStr = TestStr.substring(TestStr.indexOf(',') + 1);
    i = 0;
    while (i != 1)
    {
        if (TestStr.indexOf(',') == -1)
        {
            age_array[j] = TestStr.trim();
            i = 1;
        }
        else
        {
            age_array[j] = TestStr.substring(0, TestStr.indexOf(',')).trim();
            TestStr = TestStr.substring(TestStr.indexOf(',') + 1);
        };
        j++;
    };
    return (age_array);
};

exports.GetNumbersOffColums = function(ArrayColums, InStr)
{
    var i = 0;
    var j = 0;
    var k;
    var cur_value;
    var numbers_array = [];
    for (k = 0; k < ArrayColums.length; k++)
        numbers_array[k] = -1;
    while (i != 1)
    {
        if (InStr.indexOf(',') == -1)
        {
            for (k = 0; k < ArrayColums.length; k++)
            {
                if (ArrayColums[k] == cur_value.trim())
                {
                    numbers_array[k] = j;
                    break;
                };
            }
            i = 1;
        }
        else
        {
            cur_value = InStr.substring(0, InStr.indexOf(','));
            for (k = 0; k < ArrayColums.length; k++)
            {
                if (ArrayColums[k] == cur_value.trim())
                {
                    numbers_array[k] = j;
                    break;
                };
            }
            j++;
            InStr = InStr.substring(InStr.indexOf(',') + 1);
        };
    };
    return (numbers_array);
};

exports.SetArrayValue = function (InArray, value_nunber_str, in_value)
{
    var start_number;
    var end_number;
    var i;
    if (value_nunber_str.indexOf('-') == -1)
        return (InArray)
    else
    {
        try
        {
            start_number = parseInt(value_nunber_str.substring(0, value_nunber_str.indexOf('-')).trim(), 10);
            end_number = parseInt(value_nunber_str.substring(value_nunber_str.indexOf('-') + 1).trim(), 10);
        } catch (err)
        {
            return (InArray);
        };
        for (i = start_number; i <= end_number; i++)
            InArray[i] = parseFloat(in_value);
        return (InArray);
    };

};

exports.MaxColumnNumber = function (in_str)
{
    var ret_number;
    var i;
    var column_str = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    if (in_str.length == 1)
    {
        for (i = 0; i < 26; i++)
        {
            if (in_str[0] == column_str[i])
            {
                ret_number = i + 1;
                break;
            }

        };
    }
    else
    {
        ret_number = 0;
        for (i = 0; i < 26; i++)
        {
            if (in_str[0] == column_str[i])
            {
                ret_number = ret_number + (i + 1)*26;
                break;
            }

        };
        for (i = 0; i < 26; i++)
        {
            if (in_str[1] == column_str[i])
            {
                ret_number = ret_number + (i + 1);
                break;
            }

        };
    };
    return (ret_number);
};

exports.GetColumnStr = function (in_number)
{
    var column_str = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var ret_str;
    if (in_number <= 26)
        ret_str = column_str[in_number - 1];
    else
    {
        if (in_number%26 == 0)
            ret_str = column_str[(in_number/26 - 2)] + column_str[25];
        else
            ret_str = column_str[(in_number - in_number%26)/26 - 1] +  column_str[in_number%26 - 1];
    };

    return (ret_str);
}

exports.DelUnitInCircle = function (in_str)
{
    var ret_str;
    if(in_str.indexOf('①') != -1)
        ret_str = in_str.substring(0, in_str.indexOf('①')) + '(after deductible)'
    else ret_str = in_str;
    return (ret_str);
};

exports.ClearString = function (in_str)
{
    var ret_str;
};

exports.GetDigitsLine = function (in_str)
{
    var return_value = '';
    var start_digits = 0;
    var i = 0;
    while (i < in_str.length)
    {
        if (start_digits == 0)
        {
            if ((in_str[i] == '0') || (in_str[i] == '1') || (in_str[i] == '2') || (in_str[i] == '3') || (in_str[i] == '4') || (in_str[i] == '5') || (in_str[i] == '6') || (in_str[i] == '7') || (in_str[i] == '8') || (in_str[i] == '9') || (in_str[i] == '$'))
            {
                return_value = return_value + in_str[i];
                start_digits = 1;
            }
        }
        else if (start_digits == 1)
        {
            if ((in_str[i] == '0') || (in_str[i] == '1') || (in_str[i] == '2') || (in_str[i] == '3') || (in_str[i] == '4') || (in_str[i] == '5') || (in_str[i] == '6') || (in_str[i] == '7') || (in_str[i] == '8') || (in_str[i] == '9') || (in_str[i] == '$') || (in_str[i] == ' ') || (in_str[i] == '/'))
            {
                return_value = return_value + in_str[i];
            }
            else break;
        }
        i++;
    }
    return return_value;
};

exports.CheckCorrField = function(array)
{
    var return_value = 0;
    var result_value;
    var i, j;

    for (i = 0; i < array.length; i++)
    {
        result_value = 0;
        for (j = 0; j < array.length; j++)
        {
            if ((array[i])&&(array[j]))
            {
                if ((j != i)&&(array[i].trim() == array[j].trim())) result_value++;
            }
            else result_value++;
            if (result_value == 2) break;
        }
        if (result_value == 2) break;
    }
    if (result_value == 2) return(1);
    else return(0);
}

exports.GetCorrField = function(array)
{
    var return_value = 0;
    var result_value;
    var i, j;
    if (array.length == 0) return ('');
    for (i = 0; i < array.length; i++)
    {
        result_value = 0;
        for (j = 0; j < array.length; j++)
        {
            if ((array[i])&&(array[j]))
            {
                if ((j != i)&&(array[i].trim() == array[j].trim())) result_value++;
            }
            else result_value++;
            if (result_value == 2) break;
        }
        if (result_value == 2) break;
    }
    if (result_value == 2) return(array[i]);
    else return('');
}

exports.ConnectStr = function()
{
    var ConnectString = 'mongodb://';
    if ((nconf.get("user") != "") && (nconf.get("pass") != ""))
        ConnectString = ConnectString + nconf.get("user") + ':' + nconf.get("pass") + '@';
    ConnectString = ConnectString + nconf.get("uri");
    if (nconf.get("port") != "") ConnectString = ConnectString + ':' + nconf.get("port");
    ConnectString = ConnectString + '/' + nconf.get("database");
    return ConnectString
}