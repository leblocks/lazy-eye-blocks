const { expect } = chai;

// eslint-disable-next-line prefer-arrow-callback
describe('Test', function () {
    it('should succeedtt', (done) => {
        expect(2).to.eq(2);
        done();
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('should fail2', function (done) {
        setTimeout(() => {
            done(new Error('Failed'));
        }, 1000);
    });

    // eslint-disable-next-line prefer-arrow-callback
    it('should fail2', function () {
        // eslint-disable-next-line no-undef
        expect(2).to.eq(1);
    });
});
