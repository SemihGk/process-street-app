describe("Wistia File Upload", function() {

    beforeEach(angular.mock.module('process-street-app'));

    var element, scope,  isolatedScope;

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<video-uploader />');
        element = $compile(element)(scope);
        scope.$apply();
        isolatedScope = element.isolateScope();
    }));

    it('should have an input element', function() {
        var input = element.find('input');
        expect(input).toBeDefined('Input element is created successfully.');
    });

    it('should be no status message before file upload process', function() {
        var status = element.find('input').text();
        expect(status).toBe('');
    });

    it('should return true when files are added ', function() {
        var input = element.find('input');
        var file = {
            name: "test.mov",
            size: 611516,
            type: "video/quicktime"
        };

        var fileList = {
            0: file,
            length: 1,
            item: function(index) {
                return file;
            }
        };

        expect(isolatedScope.fileChanged(fileList)).toBe(true);

        input.files = fileList;
        input.triggerHandler({
            type: 'change',
            target: {
                files: fileList
            }
        });

        scope.$apply();
    });
});
