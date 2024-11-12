"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
var _expect = _interopRequireWildcard(require("expect"));
var _MessageBox = _interopRequireWildcard(require("./MessageBox"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable func-names, prefer-arrow-callback */

describe('MessageBox', function () {
  it('getting a message in the default language works', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'It is required'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('It is required');
  });
  it('getting a message in another language works', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'It is required'
        },
        'es-ES': {
          required: 'Es requerido'
        }
      }
    });
    messageBox.setLanguage('es-ES');
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('Es requerido');
  });
  it('throws an error if there are no messages for a language', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'It is required'
        }
      }
    });
    messageBox.setLanguage('es-ES');
    (0, _expect.default)(function () {
      messageBox.message({
        name: 'foo',
        type: 'required'
      });
    }).toThrow();
  });
  it('passing a language to `message` works', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'It is required'
        },
        'es-ES': {
          required: 'Es requerido'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    }, {
      language: 'es-ES'
    })).toBe('Es requerido');
  });
  it('template in messages works', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: '{{name}} is required',
          number: '{{{name}}} is not a number'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('foo is required');
    (0, _expect.default)(messageBox.message({
      name: 'bar',
      type: 'number'
    })).toBe('bar is not a number');
  });
  it('template in messages with html works', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          minNumber: '<strong>{{{name}}}</strong> must be at least {{min}}',
          maxNumber: '<div id="field">{{name}}</div> cannot exceed {{max}}'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: '<bar>',
      type: 'minNumber',
      min: 10
    })).toBe('<strong><bar></strong> must be at least 10');
    (0, _expect.default)(messageBox.message({
      name: '<bar>',
      type: 'maxNumber',
      max: 100
    })).toBe('<div id="field">&lt;bar&gt;</div> cannot exceed 100');
  });
  it('template with conditional works', function () {
    var messageBox = new _MessageBox.default({
      evaluate: _MessageBox.SUGGESTED_EVALUATE,
      messages: {
        en: {
          conditional: '{{# if (value) { }}true{{# } else { }}false{{# } }}'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      value: true,
      type: 'conditional'
    })).toBe('true');
    (0, _expect.default)(messageBox.message({
      value: false,
      type: 'conditional'
    })).toBe('false');
  });
  it('custom interpolate in messages works', function () {
    var messageBox = new _MessageBox.default({
      interpolate: /(?:(?:[#|$]{|<%)[=|-]?)([\s\S]+?)(?:}|%>)/g,
      messages: {
        en: {
          required: '<%= name %> is required',
          number: '#{name} is not a number',
          maxNumber: '<div id="field">#{name}</div> cannot exceed <%= max %>'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('foo is required');
    (0, _expect.default)(messageBox.message({
      name: 'bar',
      type: 'number'
    })).toBe('bar is not a number');
    (0, _expect.default)(messageBox.message({
      name: 'bar',
      type: 'maxNumber',
      max: 100
    })).toBe('<div id="field">bar</div> cannot exceed 100');
  });
  it('uses the message on error info if provided', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'It is required'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required',
      message: 'This one'
    })).toBe('This one');
  });
  it('per-field messages', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: {
            _default: 'DEFAULT',
            foo: 'FOO'
          }
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('FOO');
    (0, _expect.default)(messageBox.message({
      name: 'foo2',
      type: 'required'
    })).toBe('DEFAULT');
  });
  it('per-field messages with array field', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: {
            _default: 'DEFAULT',
            'foo.$.bar': 'FOO'
          }
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo.2.bar',
      type: 'required'
    })).toBe('FOO');
    (0, _expect.default)(messageBox.message({
      name: 'foo2.$.bar',
      type: 'required'
    })).toBe('DEFAULT');
  });
  it('falls back to global defaults', function () {
    _MessageBox.default.defaults({
      messages: {
        en: {
          required: 'It is required'
        }
      }
    });
    var messageBox = new _MessageBox.default();
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('It is required');
    _MessageBox.default.messages = {}; // Reset
  });

  it('global initial language works', function () {
    _MessageBox.default.defaults({
      initialLanguage: 'es-ES'
    });
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'It is required'
        },
        'es-ES': {
          required: 'Es requerido'
        }
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('Es requerido');
    _MessageBox.default.language = null;
  });
  it('message function is called', function () {
    var spy = (0, _expect.createSpy)();
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: spy
        }
      }
    });
    messageBox.message({
      name: 'foo',
      type: 'required'
    });
    (0, _expect.default)(spy).toHaveBeenCalledWith({
      genericName: 'foo',
      name: 'foo',
      type: 'required'
    });
  });
  it('can update by calling messages', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        en: {
          required: 'original'
        }
      }
    });
    messageBox.messages({
      en: {
        required: 'new'
      }
    });
    (0, _expect.default)(messageBox.message({
      name: 'foo',
      type: 'required'
    })).toBe('new');
  });
  it('can clone', function () {
    var messageBox = new _MessageBox.default({
      messages: {
        ab: {
          test: 'message'
        }
      }
    });
    messageBox.setLanguage('es');
    var clone = messageBox.clone();
    (0, _expect.default)(clone.language).toBe(messageBox.language);
    (0, _expect.default)(clone.messageList).toEqual(messageBox.messageList);
    (0, _expect.default)(clone.evaluate).toEqual(messageBox.evaluate);
    (0, _expect.default)(clone.escape).toEqual(messageBox.escape);
    (0, _expect.default)(clone.interpolate).toEqual(messageBox.interpolate);
    clone.messages({
      en: {
        required: 'new'
      }
    });
    (0, _expect.default)(clone.messageList.en).toEqual({
      required: 'new'
    });
    (0, _expect.default)(messageBox.messageList.en).toBe(undefined);
  });
});