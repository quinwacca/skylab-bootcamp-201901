describe('Horroy', function() {
    // WARN is this initializaton necessary?

    // var horroy;

    // beforeEach(function() {
    //     horroy = new Horroy;
    // });

    // -----------------------------------------FROM ------------------------------------------------

    describe('from', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        });
    });

    // -------------------------------------------FOREACH---------------------------------------------

    describe('forEach', function() {
        it('should iterate every value of the horroy', function() {
            var horroy = new Horroy('pizza','cheese','lettuce');
            var res = '';
            var expectedString = 'pizzacheeselettuce';

            horroy.forEach(function(item){
                res+=item;
            });

            expect(res).toBe(expectedString);
        });
        it('should return undefined', function(){
            horroy = new Horroy('pizza','cheese','lettuce');
            
            var expectedUndefined = undefined;

            var res = horroy.forEach(function(item){
                res+=item;
            });

            expect(res).toBe(expectedUndefined);
        });
    });

    // ------------------------------------ TOSTRING -------------------------------------------------

    describe('toString', function() {
        it('should return the string with all items separated by commas', function() {
            horroy = new Horroy('pizza','cheese','lettuce');

            var expectedString = 'pizza,cheese,lettuce';

            var res = horroy.toString();

            expect(res).toBe(expectedString);
        });
        // it('should return an empty string', function() {
        //     horroy = new Horroy();

        //     var expectedString = '';

        //     var res = horroy.toString();

        //     expect(res).toBe(expectedString);
        // });
    });

    // --------------------------------------------FILL------------------------------------------------

    describe('fill', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should fill horroy with the same value, all arguments correct', function() {
            var res = horroy.fill(0, 0, 2);
            
            var expected = new Horroy(0, 0, 'lettuce','bacon','tomato');
            
            expect(JSON.stringify(res)).toBe(JSON.stringify(expected));
        });
        it('should fill horroy with the same value, no end value', function() {
            var res = horroy.fill('salad', 0);
            
            var expected = new Horroy('salad', 'salad', 'salad', 'salad', 'salad');
            
            expect(JSON.stringify(res)).toBe(JSON.stringify(expected));
        });
        it('should fill horroy with the same value, no start and no end value', function() {
            var res = horroy.fill('salad');
            
            var expected = new Horroy('salad', 'salad', 'salad', 'salad', 'salad');
            
            expect(JSON.stringify(res)).toBe(JSON.stringify(expected));
        });
        it('should fill horroy fine, with negative values for start and end', function() {
            var res = horroy.fill('salad', -3, -1);
            
            var expected = new Horroy('pizza', 'cheese', 'salad', 'salad', 'tomato');
            
            expect(JSON.stringify(res)).toBe(JSON.stringify(expected));
        });
    });

    // -----------------------------------------------FIND--------------------------------------------

    describe('find', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should return the value finded', function () {
            var res = horroy.find(function(element) {return element==='lettuce';});
        
            var expected = 'lettuce';
            
            expect(res).toBe(expected);
        });
        it('should not find "salad" , so it returns undefined', function () {
            var res = horroy.find(function(element) {return element==='salad';});
        
            var expected = undefined;
            
            expect(res).toBe(expected);
        });
    });

    // -------------------------------------------- INDEXOF ----------------------------------------------

    describe('indexOf', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should return the index of the firts element found, with start index = 2', function() {
            horroy = new Horroy('pizza','bacon','lettuce','bacon','tomato');
            var res = horroy.indexOf('bacon', 2);
                
            var expected = 3;

            expect(res).toBe(expected);
        });
        it('should return -1, because function didnt find the item', function() {
            var res = horroy.indexOf('salad', 2);
                
            var expected = -1;

            expect(res).toBe(expected);
        });
        it('should return the index of the firts element found, no start index specified', function() {
            var res = horroy.indexOf('bacon');
                
            var expected = 3;

            expect(res).toBe(expected);
        });
        it('should return -1, because function didnt find the item, no start value specified', function() {
            var res = horroy.indexOf('salad');
                
            var expected = -1;

            expect(res).toBe(expected);
        });
    });


    // ------------------------------------------ JOIN --------------------------------------------------


    describe('join', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should return the expected string, with comma separator as default', function() {
            var res = horroy.join();
        
            var expected = 'pizza,cheese,lettuce,bacon,tomato';

            expect(res).toBe(expected);
        });
        it('should return the expected string, with number 1 as separator', function() {
            var res = horroy.join(1);
        
            var expected = 'pizza1cheese1lettuce1bacon1tomato';

            expect(res).toBe(expected);
        });
        it('should return the expected string, with empty string as separator', function() {
            var res = horroy.join('');
        
            var expected = 'pizzacheeselettucebacontomato';

            expect(res).toBe(expected);
        });
        it('should return the expected string, with null as separator', function() {
            var res = horroy.join(null);
        
            var expected = 'pizzanullcheesenulllettucenullbaconnulltomato';

            expect(res).toBe(expected);
        });
    });

    // ------------------------------------------ POP -----------------------------------------------

    describe('pop', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should return the deleted element, should modify the original horroy, and should reduce length', function() {
            var res = horroy.pop();

            var expectedRes = 'tomato';
            var expectedModifiedHorroy = new Horroy('pizza','cheese','lettuce','bacon');
            var lengthExpected = 4;

            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedModifiedHorroy));
            expect(res).toBe(expectedRes);
            expect(horroy.length).toBe(lengthExpected);
        });
    });
    describe('push', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should add correctly two items at the end of the horroy, and it should return the new length', function() {
            var res = horroy.push('salad','fries');

            var expectedRes = 7;
            var expectedHorroy = new Horroy('pizza','cheese','lettuce','bacon','tomato', 'salad', 'fries');

            expect(res).toBe(expectedRes);
            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedHorroy));
        });
    });

    // ------------------------------------------- REDUCE -------------------------------------------

    // ------------------------------------------- REVERSE --------------------------------------------

    describe('reverse', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should return the reversed horroy, and should reverse the original horroy', function() {
            var res = horroy.reverse();

            var expectedRes = new Horroy('tomato','bacon','lettuce','cheese','pizza');

            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedRes));
        });
    });

    // ----------------------------------------- SLICE ---------------------------------------------

    describe('slice', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should copy items to a new horroy, only start defined', function(){
            var res = horroy.slice(2);

            expectedRes = new Horroy('lettuce','bacon','tomato');

            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
        it('should not modify the original horroy', function(){
            var res = horroy.slice(2);

            expectedRes = new Horroy('pizza','cheese','lettuce','bacon','tomato');

            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedRes));
        });
        it('should copy items to a new horroy, start and end defined', function(){
            var res = horroy.slice(2,4);

            expectedRes = new Horroy('lettuce','bacon');

            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
        it('should return empty horroy, start bigger than horroy length', function(){
            var res = horroy.slice(6);

            expectedRes = new Horroy();

            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
    });

    // --------------------------------------- SPLICE --------------------------------------------

    describe('splice', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should add elements, empty horroy returned', function() {
            var res = horroy.splice(1, 0, 'salad','fries');

            var expectedHorroy = new Horroy('pizza', 'salad','fries','cheese','lettuce','bacon','tomato');
            var expectedRes = new Horroy();

            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedHorroy));
            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
        it('should delete elements', function() {
            var res = horroy.splice(1, 2);

            var expectedHorroy = new Horroy('pizza','bacon','tomato');
            var expectedRes = new Horroy('cheese','lettuce');

            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedHorroy));
            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
        it('should delete and add elements', function() {
            var res = horroy.splice(1, 2, 'salad', 'fries');

            var expectedHorroy = new Horroy('pizza', 'salad', 'fries', 'bacon','tomato');
            var expectedRes = new Horroy('cheese','lettuce');

            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedHorroy));
            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
        it('should delete and add elements, delete undefined', function() {
            var res = horroy.splice(1, undefined, 'salad', 'fries');

            var expectedHorroy = new Horroy('pizza', 'salad', 'fries', 'cheese', 'lettuce','bacon','tomato');
            var expectedRes = new Horroy();

            expect(JSON.stringify(horroy)).toBe(JSON.stringify(expectedHorroy));
            expect(JSON.stringify(res)).toBe(JSON.stringify(expectedRes));
        });
    });

    // --------------------------------------- SOME ----------------------------------------------

    describe('some', function() {
        beforeEach(function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
        });
        it('should find "cheese" and should return true', function() {
            var res = horroy.some(function(element){
                return element === 'cheese';
            })

            expectedRes = true;
            expect(res).toBe(expectedRes);
        });
        it('should not find "salad" and should return false', function() {
            var res = horroy.some(function(element){
                return element === 'salad';
            })

            expectedRes = false;
            expect(res).toBe(expectedRes);
        });
    });
});

