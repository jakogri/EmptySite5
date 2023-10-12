var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts');
var xlsx = require('xlsx');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        Network  : String,
        PlanName : String,
        PlanType : String,
        MetalTier: String,
        Deductible:
        {
            InNetwork:
            {
                Member: String,
                Family: String
            },
            OutOfNetwork:
            {
                Member: String,
                Family: String
            }
        },
        OOPLimit:
        {
            InNetwork:
            {
                Member: String,
                Family: String
            },
            OutOfNetwork:
            {
                Member: String,
                Family: String
            }
        },
        PCPVisit:
        {
            InNetwork: String,
            OutOfNetwork: String
        },
        SpecialistVisit:
        {
            InNetwork: String,
            OutOfNetwork: String
        },
        RxTier1:
        {
            InNetwork: String,
            OutOfNetwork: String
        },
        RxTier2:
        {
            InNetwork: String,
            OutOfNetwork: String
        },
        RxTier3:
        {
            InNetwork: String,
            OutOfNetwork: String
        },
        RxTier4:
        {
            InNetwork: String,
            OutOfNetwork: String
        },
        UrgentCare:
        {
            InNetwork: String,
            OutOfNetwork: String
        }
    });

exports.SaveCalChoice = function (file_name, max_colunm_str)
{
    var workbook = xlsx.readFile('./inputpages/' + file_name + '.xlsx');
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var address_of_cell;
    var ConnectString = help_scripts.ConnectStr();
    var CalChoice = mongoose.model('CalChoice', schema);
    var max_colunm_number = help_scripts.MaxColumnNunber(max_colunm_str);
    var Out_of_Network = 0;
    var i = 3;
    var NewCalChoice = [];
    var CurColumn;
    var CurColumn_Out;
    var help_str;
    var data_array = [];
    var j = 0;
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    while (i <= (max_colunm_number))
    {
        CurColumn = help_scripts.GetColumnStr(i);
        if (!worksheet[CurColumn + '4'])
        {
            i++;
            continue;
        };
        if ((worksheet[CurColumn + '4'].v.trim() == '') || (worksheet[CurColumn + '4'].v.trim() == 'Out-of-Network'))
        {
            i++;
            continue;
        };

        data_array[2] = worksheet[CurColumn + '4'].v.trim();
        CurColumn_Out = help_scripts.GetColumnStr(i + 1);
        if (!worksheet[CurColumn_Out + '4']) Out_of_Network = 0;
        else
        {
            CurColumn_Out = help_scripts.GetColumnStr(i + 1);
            if (worksheet[CurColumn_Out + '4'].v.trim() == 'Out-of-Network') Out_of_Network = 1;
            else Out_of_Network = 0;
        };

        data_array[0] = worksheet[CurColumn + '6'].v.trim();
        data_array[1] = worksheet[CurColumn + '5'].v.trim();
        data_array[3] = worksheet[CurColumn + '7'].v.trim();
        if (worksheet[CurColumn + '8'].v == 'N/A')
        {
            if (worksheet[CurColumn + '9'].v == 'N/A')
            {
                data_array[4] = 'N/A';
                data_array[5] = 'N/A';
            }
            else
            {
                help_str = worksheet[CurColumn + '9'].v.trim();
                if (help_str.indexOf('Med/Rx') != -1)
                    help_str = help_str.substring(0, help_str.indexOf('Med/Rx'));
                if (help_str.indexOf('/') != -1)
                {
                    data_array[4] = help_str.substring(0, help_str.indexOf('/'));
                    data_array[5] = help_str.substring(help_str.indexOf('/') + 1);
                }
                else
                {
                    data_array[4] = help_str;
                    data_array[5] = help_str;
                }
            };
        }
        else
        {
            help_str = worksheet[CurColumn + '8'].v.trim();
            if (help_str.indexOf('Med/Rx') != -1)
                help_str = help_str.substring(0, help_str.indexOf('Med/Rx'));
            if (help_str.indexOf('/') != -1)
            {
                data_array[4] = help_str.substring(0, help_str.indexOf('/'));
                data_array[5] = help_str.substring(help_str.indexOf('/') + 1);
            }
            else
            {
                data_array[4] = help_str;
                data_array[5] = help_str;
            }
        };
        if (Out_of_Network == 1)
        {
            if (worksheet[CurColumn_Out + '8'].v == 'N/A')
            {
                if (worksheet[CurColumn_Out + '9'].v == 'N/A')
                {
                    data_array[6] = 'N/A';
                    data_array[7] = 'N/A';
                }
                else
                {
                    help_str = worksheet[CurColumn_Out + '9'].v.trim();
                    if (help_str.indexOf('Med/Rx') != -1)
                        help_str = help_str.substring(0, help_str.indexOf('Med/Rx'));
                    if (help_str.indexOf('/') != -1)
                    {
                        data_array[6] = help_str.substring(0, help_str.indexOf('/'));
                        data_array[7] = help_str.substring(help_str.indexOf('/') + 1);
                    }
                    else
                    {
                        data_array[6] = help_str;
                        data_array[7] = help_str;
                    }
                };
            }
            else
            {
                help_str = worksheet[CurColumn_Out + '8'].v.trim();
                if (help_str.indexOf('Med/Rx') != -1)
                    help_str = help_str.substring(0, help_str.indexOf('Med/Rx'));
                if (help_str.indexOf('/') != -1)
                {
                    data_array[6] = help_str.substring(0, help_str.indexOf('/'));
                    data_array[7] = help_str.substring(help_str.indexOf('/') + 1);
                }
                else
                {
                    data_array[6] = help_str;
                    data_array[7] = help_str;
                };
            };
        }
        else
        {
            data_array[6] = '';
            data_array[7] = '';
        };
        help_str = worksheet[CurColumn + '11'].v.trim();
        if (help_str.indexOf('/') != -1)
        {
            data_array[8] = help_str.substring(0, help_str.indexOf('/'));
            data_array[9] = help_str.substring(help_str.indexOf('/') + 1);
        }
        else
        {
            data_array[8] = help_str;
            data_array[9] = help_str;
        };
        if (Out_of_Network == 1)
        {
            help_str = worksheet[CurColumn_Out + '11'].v.trim();
            if (help_str.indexOf('/') != -1)
            {
                data_array[10] = help_str.substring(0, help_str.indexOf('/'));
                data_array[11] = help_str.substring(help_str.indexOf('/') + 1);
            }
            else
            {
                data_array[10] = help_str;
                data_array[11] = help_str;
            };
        }
        else
        {
            data_array[10] = '';
            data_array[11] = '';
        };

        data_array[12] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '13'].v.trim());
        if (Out_of_Network == 1)
            data_array[13] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '13'].v.trim())
        else
            data_array[13] = '';
        data_array[14] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '14'].v.trim());
        if (Out_of_Network == 1)
            data_array[15] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '14'].v.trim())
        else
            data_array[15] = '';
        data_array[16] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '20'].v.trim());
        if (Out_of_Network == 1)
            data_array[17] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '20'].v.trim())
        else
            data_array[17] = '';
        data_array[18] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '21'].v.trim());
        if (Out_of_Network == 1)
            data_array[19] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '21'].v.trim())
        else
            data_array[19] = '';
        data_array[20] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '23'].v.trim());
        if (Out_of_Network == 1)
            data_array[21] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '23'].v.trim())
        else
            data_array[21] = '';
        data_array[22] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '22'].v.trim());
        if (Out_of_Network == 1)
            data_array[23] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '22'].v.trim())
        else
            data_array[23] = '';
        data_array[24] = help_scripts.DelUnitInCircle(worksheet[CurColumn + '28'].v.trim());
        if (Out_of_Network == 1)
            data_array[25] = help_scripts.DelUnitInCircle(worksheet[CurColumn_Out + '28'].v.trim())
        else
            data_array[25] = '';

        NewCalChoice[j] = new CalChoice(
            {
                Network: data_array[0],
                PlanName: data_array[1],
                PlanType: data_array[2],
                MetalTier: data_array[3],
                Deductible:
                {
                    InNetwork:
                    {
                        Member: data_array[4],
                        Family: data_array[5]
                    },
                    OutOfNetwork:
                    {
                        Member: data_array[6],
                        Family: data_array[7]
                    }
                },
                OOPLimit:
                {
                    InNetwork:
                    {
                        Member: data_array[8],
                        Family: data_array[9]
                    },
                    OutOfNetwork:
                    {
                        Member: data_array[10],
                        Family: data_array[11]
                    }
                },
                PCPVisit:
                {
                    InNetwork: data_array[12],
                    OutOfNetwork: data_array[13]
                },
                SpecialistVisit:
                {
                    InNetwork: data_array[14],
                    OutOfNetwork: data_array[15]
                },
                RxTier1:
                {
                    InNetwork: data_array[16],
                    OutOfNetwork: data_array[17]
                },
                RxTier2:
                {
                    InNetwork: data_array[18],
                    OutOfNetwork: data_array[19]
                },
                RxTier3:
                {
                    InNetwork: data_array[20],
                    OutOfNetwork: data_array[21]
                },
                RxTier4:
                {
                    InNetwork: data_array[22],
                    OutOfNetwork: data_array[23]
                },
                UrgentCare:
                {
                    InNetwork: data_array[24],
                    OutOfNetwork: data_array[25]
                }
            });
        try
        {
            NewCalChoice[j].save(function (err, thor)
            {
                if (err) return console.error(err);
            });
        } catch (err)
        {
            mongoose.disconnect();
            return (err);
        };
        j++;
        i++;
    };

    return ('Ok');
};