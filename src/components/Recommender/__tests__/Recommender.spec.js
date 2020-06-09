import { combineRec } from '../index';

const BEHAVIOUR_REC = ['id1', 'id9'];
const SOCIAL_REC = { id4: 10, id9: 3, id5: 5, id10: 1 };
const INTEREST_REC = ['id5', 'id6', 'id7', 'id8', 'id9'];

describe('Recommender', () => {
    describe('combineRec()', () => {

        it('should return an empty list given 0 inputs', () => {
            expect(combineRec())
                .toEqual([]);
        })

        it('should return the correct output given only 1 input', () => {
            expect(combineRec(BEHAVIOUR_REC)).toEqual([['id1', 0], ['id9', 0]]);
            expect(combineRec(undefined, SOCIAL_REC)).toEqual([['id4', 10], ['id5', 5], ['id9', 3], ['id10', 1]]);
            expect(combineRec(undefined, undefined, INTEREST_REC)).toEqual([['id5', 0], ['id6', 0], ['id7', 0], ['id8', 0], ['id9', 0]]);
        })

        it('should return the correct output given 2 inputs', () => {
            expect(combineRec(BEHAVIOUR_REC, SOCIAL_REC)).toEqual([['id9', 3], ['id4', 10], ['id5', 5], ['id10', 1], ['id1', 0]]);
            const rec = combineRec(undefined, SOCIAL_REC, INTEREST_REC);
            // console.log(rec);
            expect(rec).toEqual([['id5', 5], ['id9', 3], ['id4', 10], ['id10', 1], ['id6', 0], ['id7', 0], ['id8', 0]]);
            expect(combineRec(BEHAVIOUR_REC, undefined, INTEREST_REC)).toEqual([['id1', 0], ['id9', 0], ['id5', 0], ['id6', 0], ['id7', 0], ['id8', 0]]);
        })

        it('should return the correct output given the three inputs', () => {
            expect(combineRec(BEHAVIOUR_REC, SOCIAL_REC, INTEREST_REC))
                .toEqual([['id5', 5], ['id9', 3], ['id4', 10], ['id10', 1], ['id1', 0], ['id6', 0], ['id7', 0], ['id8', 0]]);
        })
    })
})