require("babel-polyfill");
const WebMaintenanceServiceClient = require("./psrWebMaintenanceServiceClient")
    .psrWebMaintenanceServiceClient,
  WebMultiFactorAuthServiceClient = require("./psrWebMultiFactorAuthServiceClient")
    .psrWebMultiFactorAuthServiceClient,
  WebServiceClient = require("./psrWebServiceClient").psrWebServiceClient,
  AuthenticationManager = require("./managers/authentication"),
  ContainerManager = require("./managers/container"),
  DataBindingManager = require("./managers/dataBinding"),
  LogbookManager = require("./managers/logbook"),
  ForwardingRuleManager = require("./managers/forwardingRule"),
  OptionManager = require("./managers/option"),
  OrganisationUnitManager = require("./managers/organisationUnit"),
  PasswordManager = require("./managers/password"),
  OneTimePasswordManager = require("./managers/oneTimePassword"),
  PolicyManager = require("./managers/policy"),
  RightManager = require("./managers/right"),
  RoleManager = require("./managers/role"),
  SealManager = require("./managers/seal"),
  TagManager = require("./managers/tag"),
  TemplateManager = require("./managers/template"),
  UserKeyManager = require("./managers/userKey"),
  InheritanceManager = require("./managers/inheritance"),
  GenericRightManager = require("./managers/genericRight"),
  LicenseManager = require("./managers/license"),
  ApplicationManager = require("./managers/application"),
  ActiveDirectoryManager = require("./managers/activeDirectory"),
  TriggerManager = require("./managers/trigger"),
  ProgressTokenManager = require("./managers/progressToken"),
  MailingManager = require("./managers/mailing"),
  EmailVerificationManager = require("./managers/emailVerification"),
  ExternalLinkManager = require("./managers/externalLink"),
  RealtimeEventManager = require("./managers/realtimeEvent"),
  PsrRealtime = require("./psrRealtime"),
  enums = require("./psrApiEnums"),
  types = require("./psrApiTypes"),
  http = require("./http");
(() => {
  const e = function (e) {
    this.endpoint = http.makeHttpEndpointUrl(e);
    const a = {
        maintenance: new WebMaintenanceServiceClient(this.endpoint),
        multiFactor: new WebMultiFactorAuthServiceClient(this.endpoint),
        service: new WebServiceClient(this.endpoint),
      },
      r = new PsrRealtime(e);
    (this.passwordManager = new PasswordManager()),
      (this.oneTimePasswordManager = new OneTimePasswordManager()),
      (this.activeDirectoryManager = new ActiveDirectoryManager(a)),
      (this.organisationUnitManager = new OrganisationUnitManager(a)),
      (this.dataBindingManager = new DataBindingManager(a)),
      (this.logbookManager = new LogbookManager(a)),
      (this.forwardingRuleManager = new ForwardingRuleManager(a)),
      (this.optionManager = new OptionManager(a)),
      (this.policyManager = new PolicyManager(a)),
      (this.rightManager = new RightManager(a)),
      (this.roleManager = new RoleManager(a)),
      (this.tagManager = new TagManager(a)),
      (this.templateManager = new TemplateManager(a)),
      (this.licenseManager = new LicenseManager(a)),
      (this.applicationManager = new ApplicationManager(a)),
      (this.triggerManager = new TriggerManager(a)),
      (this.sealManager = new SealManager(a, this)),
      (this.progressToken = new ProgressTokenManager(a)),
      (this.mailingManager = new MailingManager(a)),
      (this.emailVerificationManager = new EmailVerificationManager(a));
    const n = new UserKeyManager(
        a,
        this,
        this.sealManager,
        this.rightManager,
        this.roleManager
      ),
      i = new InheritanceManager(
        a,
        this,
        this.rightManager,
        this.templateManager
      );
    (this.authenticationManager = new AuthenticationManager(
      a,
      this,
      this.organisationUnitManager,
      n,
      r
    )),
      (this.genericRightManager = new GenericRightManager(
        this,
        this.rightManager,
        this.organisationUnitManager,
        this.sealManager,
        n
      )),
      (this.containerManager = new ContainerManager(
        a,
        this.passwordManager,
        i,
        this.rightManager,
        n,
        this.genericRightManager,
        this.oneTimePasswordManager
      )),
      (this.externalLinkManager = new ExternalLinkManager(a)),
      (this.realtimeEventManager = new RealtimeEventManager(r)),
      (this.currentUser = null),
      (this.sessionState = enums.PsrSessionState.Disconnected);
  };
  "undefined" != typeof module &&
    void 0 !== module.exports &&
    ((module.exports.PsrApi = e),
    (module.exports.PsrApiEnums = enums),
    (module.exports.PsrApiTypes = types)),
    "undefined" != typeof window &&
      ((window.PsrApi = e),
      (window.PsrApiEnums = enums),
      (window.PsrApiTypes = types));
})();
