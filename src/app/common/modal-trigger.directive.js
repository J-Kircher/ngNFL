"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var jQuery_service_1 = require("./jQuery.service");
var ModalTriggerDirectve = (function () {
    function ModalTriggerDirectve(ref, $) {
        this.$ = $;
        this.hostElement = ref.nativeElement;
    }
    ModalTriggerDirectve.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('[modal-trigger] ngOnInit() modalId:' + this.modalId)
        this.hostElement.addEventListener('click', function (e) {
            _this.openModal();
        });
    };
    ModalTriggerDirectve.prototype.openModal = function () {
        // console.log('[modal-trigger] openModal()')
        this.$("#" + this.modalId).modal({});
    };
    return ModalTriggerDirectve;
}());
__decorate([
    core_1.Input('modal-trigger'),
    __metadata("design:type", String)
], ModalTriggerDirectve.prototype, "modalId", void 0);
ModalTriggerDirectve = __decorate([
    core_1.Directive({
        selector: '[modal-trigger]'
    }),
    __param(1, core_1.Inject(jQuery_service_1.JQUERY_TOKEN)),
    __metadata("design:paramtypes", [core_1.ElementRef, Object])
], ModalTriggerDirectve);
exports.ModalTriggerDirectve = ModalTriggerDirectve;
//# sourceMappingURL=modal-trigger.directive.js.map