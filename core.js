'use strict';
angular
    .module('process-street-app')
    .component('videoUploader', {
        bindings: {
            upload: '='
        },
        template: `
            <div class="upload-container">
                <div class="btn btn-success btn-file" style="margin:5px 0;">
                    Upload Video
                    <input
                        id="fileupload"
                        type="file"
                        onchange="angular.element(this).scope().fileChanged(this.files)">
                    </input>
                </div>
                <span>{{upload.status}}</span>
              <div class="span12 progress" ng-show="upload.isUploading">
                <uib-progressbar
                    class="progress-striped active"
                    value="upload.progress"
                    type="info">
                  {{ upload.progress }}%
                </uib-progressbar>
              </div>
              <div ng-repeat="video in upload.videos">
                  <iframe
                      ng-src="{{video.url}}"
                      allowtransparency="true"
                      frameborder="0"
                      scrolling="no"
                      class="wistia_embed"
                      name="wistia_embed"
                      allowfullscreen
                      mozallowfullscreen
                      webkitallowfullscreen
                      oallowfullscreen
                      msallowfullscreen
                      width="620"
                      height="350">

                  </iframe>
              </div>
            </div>
        `,
        controller: function($scope, $sce, wistiaConfig) {
            $scope.upload = {
                progress: 0,
                isUploading: false,
                videos: [],
                status: ''
            };

            // For testing case
            $scope.fileChanged = function(files) {
                return !!files['0'];
            };

            // Blueimp File Upload Plugin
            $('#fileupload').fileupload({
                url: wistiaConfig.url,
                dataType: 'json',
                formData: {
                    api_password: wistiaConfig.api_password
                },
                add: function(event, file) {
                    // Immediately submit file on add
                    $scope.upload.isUploading = true;
                    $scope.upload.status = 'Uploading...';
                    file.submit();
                },
                progressall: function(event, file) {
                    // update progress bar
                    var progress = parseInt(file.loaded / file.total * 100, 10);
                    $scope.$apply(function() {
                        $scope.upload.progress = progress;
                    });
                },
                done: function(event, file) {
                    $scope.$apply(function() {
                        $scope.upload.videos.push({
                            url: $sce.trustAsResourceUrl(`//fast.wistia.net/embed/iframe/${file.result.hashed_id}`),
                            date: file.result.created
                        });
                        // hide progress bar
                        setTimeout(function () {
                            $scope.upload.isUploading = false;
                            $scope.upload.status = 'Success!';
                        }, 1000);
                    });
                },
                fail: function(event, error) {
                    $scope.$apply(function() {
                        $scope.upload.status = 'Something went wrong!';
                    });
                }
            });
        }
    });
