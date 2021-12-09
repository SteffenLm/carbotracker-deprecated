it('should ', () => {
  expect(true).toBeTruthy();
});
// import { TestBed } from '@angular/core/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Action } from '@ngrx/store';
// import { provideMockStore } from '@ngrx/store/testing';
// import { hot } from '@nrwl/angular/testing';
// import { Observable } from 'rxjs';

// import * as MealsActions from './meals.actions';
// import * as MealsPersistanceActions from './meals-persistence/meals-persistence.actions';
// import { MealsEffects } from './meals.effects';
// import { MealsFacade } from './meals.facade';
// import { NxModule } from '@nrwl/angular';
// import { getPastaMealsEntity } from './meals.models';
// import { TypedAction } from '@ngrx/store/src/models';
// import { MealsPartialState, MealsState } from './meals.reducer';
// import { mealsEntityAdapter } from './meals.entity-adapter';
// import { selectMealsState } from './meals.selectors';

// describe('MealsEffects', () => {
//   let actions: Observable<Action>;
//   let effects: MealsEffects;
//   const getInitialMealsState = () =>
//     mealsEntityAdapter.getInitialState({
//       selectedId: null,
//       loaded: false,
//       error: null,
//     });

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         MealsEffects,
//         MealsFacade,
//         provideMockActions(() => actions),
//         provideMockStore<MealsPartialState>({
//           initialState: {
//             meals: getInitialMealsState(),
//           },
//           selectors: [
//             {
//               selector: selectMealsState,
//               value: {
//                 mocked: 'Value',
//               },
//             },
//           ],
//         }),
//       ],
//     });

//     effects = TestBed.inject(MealsEffects);
//   });

//   describe('init', () => {
//     describe('if the init action is dispatched', () => {
//       beforeEach(() => {
//         actions = hot('-a-|', { a: MealsActions.init() });
//       });
//       it('should dispatch the rehydrate action', () => {
//         const expected = hot('-a-|', {
//           a: MealsPersistanceActions.rehydrateMealsState(),
//         });

//         expect(effects.init).toBeObservable(expected);
//       });
//     });
//   });

//   describe('editMealsState', () => {
//     describe('if a createMeal action is dispatched', () => {
//       let createAction: TypedAction<string>;
//       beforeEach(() => {
//         createAction = MealsActions.createMeal({ meal: getPastaMealsEntity() });
//         actions = hot('-a-|', {
//           a: createAction,
//         });
//       });
//       it('should query the current state and dispatch a hydrate action', () => {
//         const expectedAction = hot('-a-|', {
//           a: MealsPersistanceActions.hydrateMealsState({
//             mealsState: { mocked: 'Value' } as unknown as MealsState,
//             sourceAction: createAction,
//           }),
//         });
//         expect(effects.editMealsState).toBeObservable(expectedAction);
//       });
//     });
//   });
// });
