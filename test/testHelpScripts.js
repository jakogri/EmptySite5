/**
 * Tests for the help scripts
 */
var assert = require('chai').assert;
var proxyquire =  require('proxyquire')
var rewire =  require('rewire')
var mongooseMock = require('mongoose-mock')

describe("HelpScripts", function ()
{
    /* этот тест проверяет метод GetDigitsLine */
    describe("#GetDigitsLine()", function ()
    {
        it("Должна возвращать '500 80/50' на ввод 'Gold MC 500 80/50'", function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var sampleLine = "Gold MC 500 80/50";
            var result = help_scripts.GetDigitsLine(sampleLine);
            assert.equal(result, "500 80/50", "GetDigitsLine should return string '500 80/50'");
        })
    });

    /* this test checks a method GetNumbersOffColums */
    describe("#GetNumbersOffColums()", function ()
    {
        it('Shall return an array of provisions of the necessary values in line', function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var test_str = 'Carrier,Plan Id,Plan Name,Plan Type,Start Date,End Date,State,Rate Area,Rate Cat,Rate Type,0-20,21-21,22-22,23-23,24-24,25-25,26-26,27-27,28-28,29-29,30-30,31-31,32-32,33-33,34-34,35-35,36-36,37-37,38-38,39-39,40-40,41-41,42-42,43-43,44-44,45-45,46-46,47-47,48-48,49-49,50-50,51-51,52-52,53-53,54-54,55-55,56-56,57-57,58-58,59-59,60-60,61-61,62-62,63-63,64-99';
            var test_array = ['Carrier', 'Plan Id', 'Plan Name', 'Start Date', 'End Date', 'Rate Area', 'Rate Type'];
            var result = help_scripts.GetNumbersOffColums(test_array, test_str);
            assert.equal(result[3], 4, "GetNumbersOffColums should return array[3] == 4");
            assert.equal(result[6], 9, "GetNumbersOffColums should return array[6] == 10");
        });
    });

    /* this test checks a method GetAgeArray */
    describe("#GetAgeArray()", function ()
    {
        it('Shall return an array of intervals of age', function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var test_str = 'Carrier,Plan Id,Plan Name,Plan Type,Start Date,End Date,State,Rate Area,Rate Cat,Rate Type,0-20,21-21,22-22,23-23,24-24,25-25,26-26,27-27,28-28,29-29,30-30,31-31,32-32,33-33,34-34,35-35,36-36,37-37,38-38,39-39,40-40,41-41,42-42,43-43,44-44,45-45,46-46,47-47,48-48,49-49,50-50,51-51,52-52,53-53,54-54,55-55,56-56,57-57,58-58,59-59,60-60,61-61,62-62,63-63,64-99';
            var result = help_scripts.GetAgeArray(test_str);
            assert.equal(result[44], '64-99', "GetAgeArray should return array[3] == '23-23'");
        });
    });

    /* this test checks a method SetArrayValue */
    describe("#SetArrayValue()", function ()
    {
        it('Shall return an array with the necessary values in the necessary cells', function ()
        {
            var TestArray = [];
            var help_scripts = require('../schemas/HelpScripts');
            for (var i = 0; i < 100; i++) TestArray[i] = 0;
            help_scripts.SetArrayValue(TestArray, '45-58', '33.22');
            assert.equal(TestArray[48], 33.22, "SetArrayValue should return Array[48] == 33.22");
        });
    });

    /* this test checks a method GetColumnStr */
    describe("#GetColumnStr()", function ()
    {
        it('Shall return a letter symbol of a column in Excel according to its number', function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var result1 = help_scripts.GetColumnStr(52);
            var result2 = help_scripts.GetColumnStr(54);
            var result3 = help_scripts.GetColumnStr(78);
            var result4 = help_scripts.GetColumnStr(5);
            assert.equal(result1, 'AZ', "GetColumnStr should return string 'AZ'");
            assert.equal(result2, 'BB', "GetColumnStr should return string 'BB'");
            assert.equal(result3, 'BZ', "GetColumnStr should return string 'BZ'");
            assert.equal(result4, 'E', "GetColumnStr should return string 'E'");
        });
    });

    /* this test checks a method MaxColumnNumber */
    describe("#MaxColumnNumber()", function ()
    {
        it('Shall return quantity of columns in Excel on designation last of them', function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var result1 = help_scripts.MaxColumnNumber('AZ');
            var result2 = help_scripts.MaxColumnNumber('BB');
            var result3 = help_scripts.MaxColumnNumber('BZ');
            var result4 = help_scripts.MaxColumnNumber('E');
            assert.equal(result1, 52, "MaxColumnNumber should return number 52");
            assert.equal(result2, 54, "MaxColumnNumber should return number 54");
            assert.equal(result3, 78, "MaxColumnNumber should return number 78");
            assert.equal(result4, 5, "MaxColumnNumber should return number 5");
        });
    });

    /* this test checks a method GetDescriptionArray */
    describe("#GetDescriptionArray()", function ()
    {
        it('Shall return an array of values for descriptive part of a collection', function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var array_colums = ['Carrier', 'Plan Id', 'Plan Name', 'Start Date', 'End Date', 'Rate Area', 'Rate Type'];
            var position_str = 'Carrier,Plan Id,Plan Name,Plan Type,Start Date,End Date,State,Rate Area,Rate Cat,Rate Type,0-20,21-21,22-22,23-23,24-24,25-25,26-26,27-27,28-28,29-29,30-30,31-31,32-32,33-33,34-34,35-35,36-36,37-37,38-38,39-39,40-40,41-41,42-42,43-43,44-44,45-45,46-46,47-47,48-48,49-49,50-50,51-51,52-52,53-53,54-54,55-55,56-56,57-57,58-58,59-59,60-60,61-61,62-62,63-63,64-99';
            var test_str = 'ANTHEM BLUE CROSS,217605,Gold HMO 50/30%/6850,Medical,01/01/16,06/30/16,CA,1,GROUP,TABLE,323.53,509.50,509.50,509.50,509.50,511.54,521.73,533.96,553.83,570.13,578.28,590.51,602.74,610.38,618.53,622.61,626.69,630.76,634.84,642.99,651.14,663.37,675.09,691.39,711.77,735.72,764.25,796.35,833.03,869.21,909.97,950.22,994.54,1039.38,1087.78,1136.19,1188.66,1241.65,1298.21,1326.23,1382.78,1431.70,1463.79,1504.04,1528.50';
            var position_array = help_scripts.GetNumbersOffColums(array_colums, position_str);
            var description_array = help_scripts.GetDescriptionArray(position_array, test_str);
            assert.equal(description_array[4], '06/30/16', "GetDescriptionArray should return description_array[5] = '06/30/16'");
        });
    });

     /* this test checks a method GetPriceArray */
    describe("#GetPriceArray()", function ()
    {
        it('Shall return an array of the prices', function ()
        {
            var help_scripts = require('../schemas/HelpScripts');
            var array_colums = ['Carrier', 'Plan Id', 'Plan Name', 'Start Date', 'End Date', 'Rate Area', 'Rate Type'];
            var position_str = 'Carrier,Plan Id,Plan Name,Plan Type,Start Date,End Date,State,Rate Area,Rate Cat,Rate Type,0-20,21-21,22-22,23-23,24-24,25-25,26-26,27-27,28-28,29-29,30-30,31-31,32-32,33-33,34-34,35-35,36-36,37-37,38-38,39-39,40-40,41-41,42-42,43-43,44-44,45-45,46-46,47-47,48-48,49-49,50-50,51-51,52-52,53-53,54-54,55-55,56-56,57-57,58-58,59-59,60-60,61-61,62-62,63-63,64-99';
            var test_str = 'ANTHEM BLUE CROSS,217605,Gold HMO 50/30%/6850,Medical,01/01/16,06/30/16,CA,1,GROUP,TABLE,323.53,509.50,509.50,509.50,509.50,511.54,521.73,533.96,553.83,570.13,578.28,590.51,602.74,610.38,618.53,622.61,626.69,630.76,634.84,642.99,651.14,663.37,675.09,691.39,711.77,735.72,764.25,796.35,833.03,869.21,909.97,950.22,994.54,1039.38,1087.78,1136.19,1188.66,1241.65,1298.21,1326.23,1382.78,1431.70,1463.79,1504.04,1528.50';
            var position_array = help_scripts.GetNumbersOffColums(array_colums, position_str);
            var age_array = help_scripts.GetAgeArray(position_str);
            var price_array = help_scripts.GetPriceArray(age_array, position_array, test_str);
            assert.equal(price_array[99], 1528.50, "GetPriceArray should return price_array[99] = 1528.50");
        });
    });
});

/*
describe("PlansPricesCalculator", function ()
{
   
    describe("#SavePlansPricesData()", function ()
    {
      it('Shall return an array of the prices', function ()
      {
         var help_scripts = rewire('../schemas/PlansPricesCalculator');
         var path = './csv/';
         var table_name = 'testcalc';
         var check_count = help_scripts.SavePlansPricesData(path, table_name);
         assert.equal(check_count[0], 1528.50, "GetPriceArray should return price_array[99] = 1528.50");  
      });
       
    });

});

 */