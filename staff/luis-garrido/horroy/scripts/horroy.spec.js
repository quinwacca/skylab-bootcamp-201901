describe('Horroy', function() {
    // WARN is this initializaton necessary?

    // var horroy;

    // beforeEach(function() {
    //     horroy = new Horroy;
    // });

    describe('from', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';

            var horr = Horroy.from(string);

            expect(horr.toString()).toBe(string.split('').toString()); // h,o,l,a, ,m,u,n,d,o
        });
    });

    describe('push', function() {
        it('should push the correct value', function() {
            var horroy = new Horroy('pizza','cheese','lettuce');
            var pushing = 'tomato';
        
            horroy.push(pushing);
        
            expect(horroy[3]).toBe(pushing);
        });

        it('should increment his length by one', function() {
            var horroy = new Horroy('pizza','cheese','lettuce');
            var originalLength = horroy.length;

            var pushing = 'tomato';

            horroy.push(pushing);
        
            expect(horroy.length).toBe(originalLength+1);
        });
    });
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
    describe('fill', function() {
        it('should fill horroy with the same value, all arguments correct', function() {
            horroy = new Horroy('pizza','cheese','lettuce','bacon','tomato');
                        
            var res = horroy.fill(0, 0, 2);
            
            var expected = [0, 0, 'lettuce','bacon','tomato'];
            
            expect(res).toBe(expected);
            // if (res !== arr) throw Error('array and result should be the same');
            // if (res.toString() !== expected.toString()) throw Error('result should be the one expected');
            // if (arr.toString() !== expected.toString()) throw Error('array should have been changed to the one expected');
        });
    });
});