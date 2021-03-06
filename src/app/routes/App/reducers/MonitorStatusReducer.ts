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
  handleActions,
  ReducerMap,
  Reducer,
} from 'redux-actions';
import * as _ from 'lodash';

// Local
import * as monitorStatus from '../actions/MonitorStatusActions';
import { NormalizedMonitorList } from '../../../services/monitors/types';

/**
 * State shape for the MonitorStatus container.
 */
export interface MonitorStatusState {
  /** If the modal list is loading. */
  loading: boolean;
  /** If the monitor status modal is active. */
  modalActive: boolean;
  /** Current list of monitors. */
  monitors: NormalizedMonitorList | null;
  /** Names of the monitors that are currently down. */
  monitorsDown: string[];
  /** Names of monitors that are current up. */
  monitorsUp: string[];
  /** Selected monitor for more detail info. */
  selectedMonitor: string | null;
}

type PartialState = Partial<MonitorStatusState>;

/**
 * Initial State of the MonitorStatus container.
 * @type {State}
 */
export const INITIAL_STATE: MonitorStatusState = {
  loading: false,
  modalActive: false,
  monitors: null,
  monitorsDown: [],
  monitorsUp: [],
  selectedMonitor: null,
};

const reducers: ReducerMap<MonitorStatusState, any> = {};

// --------------------------------------------------------------------------
// MONITOR_STATUS/FETCH_MONITORS_PENDING
// --------------------------------------------------------------------------

/**
 * Changes the loading property to true.
 * @param state MonitorStatus state.
 */
reducers[monitorStatus.FETCH_MONITORS_PENDING] = (
  state: MonitorStatusState,
): MonitorStatusState => {
  const update: PartialState = { loading: true };

  return _.assign({}, state, update);
};

// --------------------------------------------------------------------------
// MONITOR_STATUS/FETCH_MONITORS_SUCCESS
// --------------------------------------------------------------------------

/**
 * Changes the loading property to false and sets all the payload entities
 * from a FETCH_MONITORS_SUCCESS action onto the state.
 * @param state MonitorStatus state.
 * @param action FETCH_MONITORS_SUCCESS action.
 */
reducers[monitorStatus.FETCH_MONITORS_SUCCESS] = (
  state: MonitorStatusState,
  action: monitorStatus.FetchMonitorsSuccessAction,
): MonitorStatusState => {
  const update: PartialState = {
    loading: false,
    monitors: action.payload.monitors,
    monitorsDown: action.payload.monitorsDown,
    monitorsUp: action.payload.monitorsUp,
  };

  return _.assign({}, state, update);
};

// --------------------------------------------------------------------------
// MONITOR_STATUS/SELECT_MONITOR
// --------------------------------------------------------------------------

/**
 * Sets the selected monitor onto the state.
 * @param state MonitorStatus state.
 * @param action SELECT_MONITOR action.
 */
reducers[monitorStatus.SELECT_MONITOR] = (
  state: MonitorStatusState,
  action: monitorStatus.SelectMonitorAction,
): MonitorStatusState => {
  const update: PartialState = {
    selectedMonitor: action.payload,
  };

  return _.assign({}, state, update);
};

// --------------------------------------------------------------------------
// MONITOR_STATUS/OPEN_MODAL
// --------------------------------------------------------------------------

/**
 * Sets the modal state to active.
 * @param state MonitorStatus state.
 * @param action OPEN_MODAL action.
 */
reducers[monitorStatus.OPEN_MODAL] = (
  state: MonitorStatusState,
  action: monitorStatus.OpenModalAction,
): MonitorStatusState => {
  const update: PartialState = { modalActive: true };

  return _.assign({}, state, update);
};

// --------------------------------------------------------------------------
// MONITOR_STATUS/CLOSE_MODAL
// --------------------------------------------------------------------------

/**
 * Sets the modal state to inactive and unsets the currently selected modal.
 * @param state MonitorStatus state.
 * @param action CLOSE_MODAL action.
 */
reducers[monitorStatus.CLOSE_MODAL] = (
  state: MonitorStatusState,
  action: monitorStatus.CloseModalAction,
): MonitorStatusState => {
  const update: PartialState = {
    modalActive: false,
    selectedMonitor: null,
  };

  return _.assign({}, state, update);
};

/**
 * Reducer for the MonitorStatus state.
 * @type {Reducer<State, any>}
 */
export const MonitorStatusReducer = handleActions<MonitorStatusState, any>(
  reducers,
  INITIAL_STATE,
);
