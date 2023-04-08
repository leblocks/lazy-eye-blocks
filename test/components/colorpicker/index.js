import { getColorForPaletteNumber, getColorAtPoint } from '../../../src/ui/components/colorpicker';

const { expect } = chai;

describe('Color picker', () => {
    it('getColorForPaletteNumber', () => {
        expect(getColorForPaletteNumber(0)).to.eq('rgb(255,0,0)');
        expect(getColorForPaletteNumber(12)).to.eq('rgb(0,0,0)');
        expect(getColorForPaletteNumber(24)).to.eq('rgb(0,0,255)');
    });

    it('getColorAtPoint', () => {
        const width = 240;
        expect(getColorAtPoint(0, width)).to.eq('rgb(255,0,0)');
        expect(getColorAtPoint(1.222, width)).to.eq('rgb(255,0,0)');
        expect(getColorAtPoint(120, width)).to.eq('rgb(0,0,0)');
        expect(getColorAtPoint(231.99, width)).to.eq('rgb(0,0,255)');
        expect(getColorAtPoint(232, width)).to.eq('rgb(0,0,255)');
    });
});
