/**
 * Copyright 2017 IBM Corp.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />

import { Injectable } from '@angular/core';

@Injectable()
export class MyWardDataProvider {
  data: any = null;
  objectStorageAccess: any = null;

  constructor() {
    console.log('--> MyWardDataProvider constructor() called');
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
    // don't have the data yet
    console.log('--> MyWardDataProvider loading data from adapter ...');
    return new Promise(resolve => {
      let dataRequest = new WLResourceRequest("/adapters/MyWardData", WLResourceRequest.GET);
      dataRequest.send().then(
        (response) => {
          console.log('--> MyWardDataProvider loaded data from adapter ', response);
          this.data = response.responseJSON;
          resolve(this.data)
        }, (failure) => {
          console.log('--> MyWardDataProvider failed to load data', failure);
          resolve('error')
        })
    });
  }

  getObjectStorageAccess() {
    if (this.objectStorageAccess) {
      // already loaded data
      return Promise.resolve(this.objectStorageAccess);
    }
    // don't have the data yet
    console.log('--> MyWardDataProvider getting Object Storage AuthToken from adapter ...');
    return new Promise(resolve => {
      let dataRequest = new WLResourceRequest("/adapters/MyWardData/objectStorage", WLResourceRequest.GET);
      dataRequest.send().then(
        (response) => {
          console.log('--> MyWardDataProvider got Object Storage AuthToken from adapter ', response);
          this.objectStorageAccess = response.responseJSON;
          resolve(this.objectStorageAccess)
        }, (failure) => {
          console.log('--> MyWardDataProvider failed to get Object Storage AuthToken from adapter', failure);
          resolve('error')
        })
    });
  }

  uploadNewGrievance(grievance) {
    return new Promise( (resolve,reject) => {
      console.log('--> MyWardDataProvider: Uploading new grievance to server ...');
      let dataRequest = new WLResourceRequest("/adapters/MyWardData", WLResourceRequest.POST);
      dataRequest.setHeader("Content-Type","application/json");
      dataRequest.send(grievance).then(
        (response) => {
          console.log('--> MyWardDataProvider: Upload successful:\n', response);
          resolve(response)
        }, (failure) => {
          console.log('--> MyWardDataProvider: Upload failed:\n', failure);
          reject(failure)
        })
    });
  }
}
