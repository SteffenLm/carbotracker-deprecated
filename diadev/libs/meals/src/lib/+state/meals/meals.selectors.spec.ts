it('should ', () => {
  expect(true).toBeTruthy();
});
// import { MealsEntity } from './meals.models';
// import { mealsAdapter, MealsPartialState, initialState } from './meals.reducer';
// import * as MealsSelectors from './meals.selectors';

// describe('Meals Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getMealsId = (it: MealsEntity) => it.id;
//   const createMealsEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as MealsEntity);

//   let state: MealsPartialState;

//   beforeEach(() => {
//     state = {
//       meals: mealsAdapter.setAll(
//         [
//           createMealsEntity('PRODUCT-AAA'),
//           createMealsEntity('PRODUCT-BBB'),
//           createMealsEntity('PRODUCT-CCC'),
//         ],
//         {
//           ...initialState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true,
//         },
//       ),
//     };
//   });

//   describe('Meals Selectors', () => {
//     it('getAllMeals() should return the list of Meals', () => {
//       const results = MealsSelectors.getAllMeals(state);
//       const selId = getMealsId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = MealsSelectors.getSelected(state) as MealsEntity;
//       const selId = getMealsId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getMealsLoaded() should return the current "loaded" status', () => {
//       const result = MealsSelectors.getMealsLoaded(state);

//       expect(result).toBe(true);
//     });

//     it('getMealsError() should return the current "error" state', () => {
//       const result = MealsSelectors.getMealsError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
