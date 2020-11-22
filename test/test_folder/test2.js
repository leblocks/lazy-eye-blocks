const { expect } = chai;


// eslint-disable-next-line prefer-arrow-callback
describe('Test2', function () {
    // eslint-disable-next-line prefer-arrow-callback
    it('test', function (done) {
        setTimeout(() => done(), 1000);
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('should fail', function (done) {
        setTimeout(() => {
            expect(2).to.eq(1);
            done();
        }, 1000);
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('should fail2', function () {
        // eslint-disable-next-line no-undef
        expect(2).to.eq(1);
    });
});
