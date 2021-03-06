/**
 * The contents of this file are subject to the CYPHON Proprietary Non-
 * Commercial Registered User Use License Agreement (the "Agreement”). You
 * may not use this file except in compliance with the Agreement, a copy
 * of which may be found at https://github.com/dunbarcyber/cyclops/. The
 * developer of the CYPHON technology and platform is Dunbar Security
 * Systems, Inc.
 *
 * The CYPHON technology or platform are distributed under the Agreement on
 * an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or
 * implied. See the Agreement for specific terms.
 *
 * Copyright (C) 2017 Dunbar Security Solutions, Inc. All Rights Reserved.
 *
 * Contributor/Change Made By: ________________. [Only apply if changes
 * are made]
 */

// Vendor
import {
  Reducer,
  ReducerMap,
  handleActions,
} from 'redux-actions';

// Local
import * as actions from '../actions/categoryActions';
import { NormalizedCategoryList } from '~/services/alerts/types';

/** State shape of the reducer. */
export type CategoryStoreReducerState = NormalizedCategoryList;

/**
 * Initial state of the reducer.
 * @type {State}
 */
export const INITIAL_STATE: CategoryStoreReducerState = {
  result: [],
  entities: {
    categories: {},
  },
};

/**
 * Reducer map for the category reducer.
 * @type {ReducerMap<State, any>}
 */
const reducers: ReducerMap<CategoryStoreReducerState, any> = {};

/**
 * Updates the reducer based on a(n) FETCH_CATEGORIES_SUCCESS action.
 * @param state Current reducer state.
 * @param action FETCH_CATEGORIES_SUCCESS action.
 * @returns {State} Updated reducer state.
 */
reducers[actions.FETCH_CATEGORIES_SUCCESS] = (
  state: CategoryStoreReducerState,
  action: actions.FetchCategoriesSuccessAction,
): CategoryStoreReducerState => {
  return { ...action.payload };
};

/**
 * Category store reducer.
 * @type {Reducer<State, any>}
 */
export const categoryStoreReducer = handleActions<
  CategoryStoreReducerState,
  any
>(reducers, INITIAL_STATE);
