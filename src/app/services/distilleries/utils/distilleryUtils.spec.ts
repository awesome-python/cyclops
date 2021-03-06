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
import * as chai from 'chai';

// Local
import * as utils from './distilleryUtils';

describe('api.distilleries.utils', () => {
  describe('shortenDistilleryName()', () => {
    it('should remove the backend name from a distillery name', () => {
      const distilleryName = 'backend.store.collection';
      const shortened = utils.shortenDistilleryName(distilleryName);

      chai.expect(shortened).to.equal('store.collection');
    });

    it('should return an empty string for an empty string', () => {
      const shortened = utils.shortenDistilleryName('');

      chai.expect(shortened).to.equal('');
    });

    it('should return the given string if there are no periods', () => {
      const name = 'hello';
      const shortened = utils.shortenDistilleryName(name);

      chai.expect(shortened).to.equal(name);
    });
  });

  describe('getBackendName()', () => {
    it('should return the warehouse name from a distillery name', () => {
      const name = 'backend.store.collection';
      const warehouse = utils.getBackendName(name);

      chai.expect(warehouse).to.equal('backend');
    });

    it('should return an empty string if there is no warehouse name', () => {
      const name = 'name';
      const warehouse = utils.getBackendName(name);

      chai.expect(warehouse).to.equal('');
    });

    it('should return an empty string if given an empty string', () => {
      const name = '';
      const warehouse = utils.getBackendName(name);

      chai.expect(warehouse).to.equal('');
    });
  });

  describe('shortenDistilleryDictionary()', () => {
    it('should shorten the keys of a dictionary to remove backend names', () => {
      const distilleries = {
        'distillery.name': {},
        'another.distillery': {},
      };
      const shortened = utils.shortenDistilleryDictionary(
        distilleries,
      );

      chai.expect(shortened).to.deep.equal({
        name: {},
        distillery: {},
      });
    });
  });

  describe('sortByWarehouse()', () => {
    it('should sort a list of distilleries by their warehouse names', () => {
      const distillery1 = { name: 'backend.one.collection' };
      const distillery2 = { name: 'backend.one.collection' };
      const distillery3 = { name: 'magic.two.collection' };
      const distilleries: any[] = [distillery1, distillery2, distillery3];
      const sorted = utils.sortByWarehouse(distilleries);

      chai.expect(sorted).to.deep.equal({
        one: [distillery1, distillery2],
        two: [distillery3],
      });
    });
  });
});
