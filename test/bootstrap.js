global.chai = require('chai');
global.sinon = require('sinon');
global.expect = chai.expect;

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var sinonChai = require('sinon-chai');
chai.use(sinonChai);