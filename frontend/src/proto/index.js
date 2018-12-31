/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * RPCType enum.
 * @exports RPCType
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} SPEAK=1 SPEAK value
 * @property {number} BYE=2 BYE value
 */
$root.RPCType = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "SPEAK"] = 1;
    values[valuesById[2] = "BYE"] = 2;
    return values;
})();

$root.RPC = (function() {

    /**
     * Properties of a RPC.
     * @exports IRPC
     * @interface IRPC
     * @property {RPCType|null} [type] RPC type
     * @property {Uint8Array|null} [payload] RPC payload
     */

    /**
     * Constructs a new RPC.
     * @exports RPC
     * @classdesc Represents a RPC.
     * @implements IRPC
     * @constructor
     * @param {IRPC=} [properties] Properties to set
     */
    function RPC(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RPC type.
     * @member {RPCType} type
     * @memberof RPC
     * @instance
     */
    RPC.prototype.type = 0;

    /**
     * RPC payload.
     * @member {Uint8Array} payload
     * @memberof RPC
     * @instance
     */
    RPC.prototype.payload = $util.newBuffer([]);

    /**
     * Creates a new RPC instance using the specified properties.
     * @function create
     * @memberof RPC
     * @static
     * @param {IRPC=} [properties] Properties to set
     * @returns {RPC} RPC instance
     */
    RPC.create = function create(properties) {
        return new RPC(properties);
    };

    /**
     * Encodes the specified RPC message. Does not implicitly {@link RPC.verify|verify} messages.
     * @function encode
     * @memberof RPC
     * @static
     * @param {IRPC} message RPC message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RPC.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && message.hasOwnProperty("type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.payload != null && message.hasOwnProperty("payload"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
        return writer;
    };

    /**
     * Encodes the specified RPC message, length delimited. Does not implicitly {@link RPC.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RPC
     * @static
     * @param {IRPC} message RPC message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RPC.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RPC message from the specified reader or buffer.
     * @function decode
     * @memberof RPC
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RPC} RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RPC.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RPC();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int32();
                break;
            case 2:
                message.payload = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RPC message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RPC
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RPC} RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RPC.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RPC message.
     * @function verify
     * @memberof RPC
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RPC.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
                break;
            }
        if (message.payload != null && message.hasOwnProperty("payload"))
            if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                return "payload: buffer expected";
        return null;
    };

    /**
     * Creates a RPC message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RPC
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RPC} RPC
     */
    RPC.fromObject = function fromObject(object) {
        if (object instanceof $root.RPC)
            return object;
        var message = new $root.RPC();
        switch (object.type) {
        case "UNKNOWN":
        case 0:
            message.type = 0;
            break;
        case "SPEAK":
        case 1:
            message.type = 1;
            break;
        case "BYE":
        case 2:
            message.type = 2;
            break;
        }
        if (object.payload != null)
            if (typeof object.payload === "string")
                $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
            else if (object.payload.length)
                message.payload = object.payload;
        return message;
    };

    /**
     * Creates a plain object from a RPC message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RPC
     * @static
     * @param {RPC} message RPC
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RPC.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = options.enums === String ? "UNKNOWN" : 0;
            if (options.bytes === String)
                object.payload = "";
            else {
                object.payload = [];
                if (options.bytes !== Array)
                    object.payload = $util.newBuffer(object.payload);
            }
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.RPCType[message.type] : message.type;
        if (message.payload != null && message.hasOwnProperty("payload"))
            object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
        return object;
    };

    /**
     * Converts this RPC to JSON.
     * @function toJSON
     * @memberof RPC
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RPC.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RPC;
})();

$root.SpeakRequest = (function() {

    /**
     * Properties of a SpeakRequest.
     * @exports ISpeakRequest
     * @interface ISpeakRequest
     * @property {boolean|null} [speaking] SpeakRequest speaking
     */

    /**
     * Constructs a new SpeakRequest.
     * @exports SpeakRequest
     * @classdesc Represents a SpeakRequest.
     * @implements ISpeakRequest
     * @constructor
     * @param {ISpeakRequest=} [properties] Properties to set
     */
    function SpeakRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SpeakRequest speaking.
     * @member {boolean} speaking
     * @memberof SpeakRequest
     * @instance
     */
    SpeakRequest.prototype.speaking = false;

    /**
     * Creates a new SpeakRequest instance using the specified properties.
     * @function create
     * @memberof SpeakRequest
     * @static
     * @param {ISpeakRequest=} [properties] Properties to set
     * @returns {SpeakRequest} SpeakRequest instance
     */
    SpeakRequest.create = function create(properties) {
        return new SpeakRequest(properties);
    };

    /**
     * Encodes the specified SpeakRequest message. Does not implicitly {@link SpeakRequest.verify|verify} messages.
     * @function encode
     * @memberof SpeakRequest
     * @static
     * @param {ISpeakRequest} message SpeakRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeakRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.speaking != null && message.hasOwnProperty("speaking"))
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.speaking);
        return writer;
    };

    /**
     * Encodes the specified SpeakRequest message, length delimited. Does not implicitly {@link SpeakRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SpeakRequest
     * @static
     * @param {ISpeakRequest} message SpeakRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SpeakRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SpeakRequest message from the specified reader or buffer.
     * @function decode
     * @memberof SpeakRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SpeakRequest} SpeakRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeakRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SpeakRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.speaking = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SpeakRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SpeakRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SpeakRequest} SpeakRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SpeakRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SpeakRequest message.
     * @function verify
     * @memberof SpeakRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SpeakRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.speaking != null && message.hasOwnProperty("speaking"))
            if (typeof message.speaking !== "boolean")
                return "speaking: boolean expected";
        return null;
    };

    /**
     * Creates a SpeakRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SpeakRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SpeakRequest} SpeakRequest
     */
    SpeakRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.SpeakRequest)
            return object;
        var message = new $root.SpeakRequest();
        if (object.speaking != null)
            message.speaking = Boolean(object.speaking);
        return message;
    };

    /**
     * Creates a plain object from a SpeakRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SpeakRequest
     * @static
     * @param {SpeakRequest} message SpeakRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SpeakRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.speaking = false;
        if (message.speaking != null && message.hasOwnProperty("speaking"))
            object.speaking = message.speaking;
        return object;
    };

    /**
     * Converts this SpeakRequest to JSON.
     * @function toJSON
     * @memberof SpeakRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SpeakRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return SpeakRequest;
})();

$root.CursorPosition = (function() {

    /**
     * Properties of a CursorPosition.
     * @exports ICursorPosition
     * @interface ICursorPosition
     * @property {number|null} [x] CursorPosition x
     * @property {number|null} [y] CursorPosition y
     * @property {number|null} [userId] CursorPosition userId
     * @property {number|Long|null} [timestampMs] CursorPosition timestampMs
     */

    /**
     * Constructs a new CursorPosition.
     * @exports CursorPosition
     * @classdesc Represents a CursorPosition.
     * @implements ICursorPosition
     * @constructor
     * @param {ICursorPosition=} [properties] Properties to set
     */
    function CursorPosition(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CursorPosition x.
     * @member {number} x
     * @memberof CursorPosition
     * @instance
     */
    CursorPosition.prototype.x = 0;

    /**
     * CursorPosition y.
     * @member {number} y
     * @memberof CursorPosition
     * @instance
     */
    CursorPosition.prototype.y = 0;

    /**
     * CursorPosition userId.
     * @member {number} userId
     * @memberof CursorPosition
     * @instance
     */
    CursorPosition.prototype.userId = 0;

    /**
     * CursorPosition timestampMs.
     * @member {number|Long} timestampMs
     * @memberof CursorPosition
     * @instance
     */
    CursorPosition.prototype.timestampMs = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new CursorPosition instance using the specified properties.
     * @function create
     * @memberof CursorPosition
     * @static
     * @param {ICursorPosition=} [properties] Properties to set
     * @returns {CursorPosition} CursorPosition instance
     */
    CursorPosition.create = function create(properties) {
        return new CursorPosition(properties);
    };

    /**
     * Encodes the specified CursorPosition message. Does not implicitly {@link CursorPosition.verify|verify} messages.
     * @function encode
     * @memberof CursorPosition
     * @static
     * @param {ICursorPosition} message CursorPosition message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CursorPosition.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.x != null && message.hasOwnProperty("x"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.x);
        if (message.y != null && message.hasOwnProperty("y"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.y);
        if (message.userId != null && message.hasOwnProperty("userId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.userId);
        if (message.timestampMs != null && message.hasOwnProperty("timestampMs"))
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.timestampMs);
        return writer;
    };

    /**
     * Encodes the specified CursorPosition message, length delimited. Does not implicitly {@link CursorPosition.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CursorPosition
     * @static
     * @param {ICursorPosition} message CursorPosition message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CursorPosition.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CursorPosition message from the specified reader or buffer.
     * @function decode
     * @memberof CursorPosition
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CursorPosition} CursorPosition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CursorPosition.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CursorPosition();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.x = reader.uint32();
                break;
            case 2:
                message.y = reader.uint32();
                break;
            case 3:
                message.userId = reader.uint32();
                break;
            case 4:
                message.timestampMs = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CursorPosition message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CursorPosition
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CursorPosition} CursorPosition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CursorPosition.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CursorPosition message.
     * @function verify
     * @memberof CursorPosition
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CursorPosition.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.x != null && message.hasOwnProperty("x"))
            if (!$util.isInteger(message.x))
                return "x: integer expected";
        if (message.y != null && message.hasOwnProperty("y"))
            if (!$util.isInteger(message.y))
                return "y: integer expected";
        if (message.userId != null && message.hasOwnProperty("userId"))
            if (!$util.isInteger(message.userId))
                return "userId: integer expected";
        if (message.timestampMs != null && message.hasOwnProperty("timestampMs"))
            if (!$util.isInteger(message.timestampMs) && !(message.timestampMs && $util.isInteger(message.timestampMs.low) && $util.isInteger(message.timestampMs.high)))
                return "timestampMs: integer|Long expected";
        return null;
    };

    /**
     * Creates a CursorPosition message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CursorPosition
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CursorPosition} CursorPosition
     */
    CursorPosition.fromObject = function fromObject(object) {
        if (object instanceof $root.CursorPosition)
            return object;
        var message = new $root.CursorPosition();
        if (object.x != null)
            message.x = object.x >>> 0;
        if (object.y != null)
            message.y = object.y >>> 0;
        if (object.userId != null)
            message.userId = object.userId >>> 0;
        if (object.timestampMs != null)
            if ($util.Long)
                (message.timestampMs = $util.Long.fromValue(object.timestampMs)).unsigned = true;
            else if (typeof object.timestampMs === "string")
                message.timestampMs = parseInt(object.timestampMs, 10);
            else if (typeof object.timestampMs === "number")
                message.timestampMs = object.timestampMs;
            else if (typeof object.timestampMs === "object")
                message.timestampMs = new $util.LongBits(object.timestampMs.low >>> 0, object.timestampMs.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a CursorPosition message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CursorPosition
     * @static
     * @param {CursorPosition} message CursorPosition
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CursorPosition.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.x = 0;
            object.y = 0;
            object.userId = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.timestampMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestampMs = options.longs === String ? "0" : 0;
        }
        if (message.x != null && message.hasOwnProperty("x"))
            object.x = message.x;
        if (message.y != null && message.hasOwnProperty("y"))
            object.y = message.y;
        if (message.userId != null && message.hasOwnProperty("userId"))
            object.userId = message.userId;
        if (message.timestampMs != null && message.hasOwnProperty("timestampMs"))
            if (typeof message.timestampMs === "number")
                object.timestampMs = options.longs === String ? String(message.timestampMs) : message.timestampMs;
            else
                object.timestampMs = options.longs === String ? $util.Long.prototype.toString.call(message.timestampMs) : options.longs === Number ? new $util.LongBits(message.timestampMs.low >>> 0, message.timestampMs.high >>> 0).toNumber(true) : message.timestampMs;
        return object;
    };

    /**
     * Converts this CursorPosition to JSON.
     * @function toJSON
     * @memberof CursorPosition
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CursorPosition.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CursorPosition;
})();

$root.ClientFrame = (function() {

    /**
     * Properties of a ClientFrame.
     * @exports IClientFrame
     * @interface IClientFrame
     * @property {number|null} [sequence] ClientFrame sequence
     * @property {ICursorPosition|null} [position] ClientFrame position
     */

    /**
     * Constructs a new ClientFrame.
     * @exports ClientFrame
     * @classdesc Represents a ClientFrame.
     * @implements IClientFrame
     * @constructor
     * @param {IClientFrame=} [properties] Properties to set
     */
    function ClientFrame(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClientFrame sequence.
     * @member {number} sequence
     * @memberof ClientFrame
     * @instance
     */
    ClientFrame.prototype.sequence = 0;

    /**
     * ClientFrame position.
     * @member {ICursorPosition|null|undefined} position
     * @memberof ClientFrame
     * @instance
     */
    ClientFrame.prototype.position = null;

    /**
     * Creates a new ClientFrame instance using the specified properties.
     * @function create
     * @memberof ClientFrame
     * @static
     * @param {IClientFrame=} [properties] Properties to set
     * @returns {ClientFrame} ClientFrame instance
     */
    ClientFrame.create = function create(properties) {
        return new ClientFrame(properties);
    };

    /**
     * Encodes the specified ClientFrame message. Does not implicitly {@link ClientFrame.verify|verify} messages.
     * @function encode
     * @memberof ClientFrame
     * @static
     * @param {IClientFrame} message ClientFrame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientFrame.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.sequence);
        if (message.position != null && message.hasOwnProperty("position"))
            $root.CursorPosition.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ClientFrame message, length delimited. Does not implicitly {@link ClientFrame.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClientFrame
     * @static
     * @param {IClientFrame} message ClientFrame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientFrame.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClientFrame message from the specified reader or buffer.
     * @function decode
     * @memberof ClientFrame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClientFrame} ClientFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientFrame.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientFrame();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sequence = reader.uint32();
                break;
            case 2:
                message.position = $root.CursorPosition.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ClientFrame message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClientFrame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClientFrame} ClientFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientFrame.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClientFrame message.
     * @function verify
     * @memberof ClientFrame
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClientFrame.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            if (!$util.isInteger(message.sequence))
                return "sequence: integer expected";
        if (message.position != null && message.hasOwnProperty("position")) {
            var error = $root.CursorPosition.verify(message.position);
            if (error)
                return "position." + error;
        }
        return null;
    };

    /**
     * Creates a ClientFrame message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClientFrame
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClientFrame} ClientFrame
     */
    ClientFrame.fromObject = function fromObject(object) {
        if (object instanceof $root.ClientFrame)
            return object;
        var message = new $root.ClientFrame();
        if (object.sequence != null)
            message.sequence = object.sequence >>> 0;
        if (object.position != null) {
            if (typeof object.position !== "object")
                throw TypeError(".ClientFrame.position: object expected");
            message.position = $root.CursorPosition.fromObject(object.position);
        }
        return message;
    };

    /**
     * Creates a plain object from a ClientFrame message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClientFrame
     * @static
     * @param {ClientFrame} message ClientFrame
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClientFrame.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.sequence = 0;
            object.position = null;
        }
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            object.sequence = message.sequence;
        if (message.position != null && message.hasOwnProperty("position"))
            object.position = $root.CursorPosition.toObject(message.position, options);
        return object;
    };

    /**
     * Converts this ClientFrame to JSON.
     * @function toJSON
     * @memberof ClientFrame
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClientFrame.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ClientFrame;
})();

$root.ServerFrame = (function() {

    /**
     * Properties of a ServerFrame.
     * @exports IServerFrame
     * @interface IServerFrame
     * @property {number|null} [sequence] ServerFrame sequence
     * @property {Array.<ICursorPosition>|null} [positions] ServerFrame positions
     * @property {number|null} [speakerId] ServerFrame speakerId
     */

    /**
     * Constructs a new ServerFrame.
     * @exports ServerFrame
     * @classdesc Represents a ServerFrame.
     * @implements IServerFrame
     * @constructor
     * @param {IServerFrame=} [properties] Properties to set
     */
    function ServerFrame(properties) {
        this.positions = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ServerFrame sequence.
     * @member {number} sequence
     * @memberof ServerFrame
     * @instance
     */
    ServerFrame.prototype.sequence = 0;

    /**
     * ServerFrame positions.
     * @member {Array.<ICursorPosition>} positions
     * @memberof ServerFrame
     * @instance
     */
    ServerFrame.prototype.positions = $util.emptyArray;

    /**
     * ServerFrame speakerId.
     * @member {number} speakerId
     * @memberof ServerFrame
     * @instance
     */
    ServerFrame.prototype.speakerId = 0;

    /**
     * Creates a new ServerFrame instance using the specified properties.
     * @function create
     * @memberof ServerFrame
     * @static
     * @param {IServerFrame=} [properties] Properties to set
     * @returns {ServerFrame} ServerFrame instance
     */
    ServerFrame.create = function create(properties) {
        return new ServerFrame(properties);
    };

    /**
     * Encodes the specified ServerFrame message. Does not implicitly {@link ServerFrame.verify|verify} messages.
     * @function encode
     * @memberof ServerFrame
     * @static
     * @param {IServerFrame} message ServerFrame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerFrame.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.sequence);
        if (message.positions != null && message.positions.length)
            for (var i = 0; i < message.positions.length; ++i)
                $root.CursorPosition.encode(message.positions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.speakerId != null && message.hasOwnProperty("speakerId"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.speakerId);
        return writer;
    };

    /**
     * Encodes the specified ServerFrame message, length delimited. Does not implicitly {@link ServerFrame.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ServerFrame
     * @static
     * @param {IServerFrame} message ServerFrame message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerFrame.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ServerFrame message from the specified reader or buffer.
     * @function decode
     * @memberof ServerFrame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ServerFrame} ServerFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerFrame.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServerFrame();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sequence = reader.uint32();
                break;
            case 2:
                if (!(message.positions && message.positions.length))
                    message.positions = [];
                message.positions.push($root.CursorPosition.decode(reader, reader.uint32()));
                break;
            case 3:
                message.speakerId = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ServerFrame message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ServerFrame
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ServerFrame} ServerFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerFrame.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ServerFrame message.
     * @function verify
     * @memberof ServerFrame
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ServerFrame.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            if (!$util.isInteger(message.sequence))
                return "sequence: integer expected";
        if (message.positions != null && message.hasOwnProperty("positions")) {
            if (!Array.isArray(message.positions))
                return "positions: array expected";
            for (var i = 0; i < message.positions.length; ++i) {
                var error = $root.CursorPosition.verify(message.positions[i]);
                if (error)
                    return "positions." + error;
            }
        }
        if (message.speakerId != null && message.hasOwnProperty("speakerId"))
            if (!$util.isInteger(message.speakerId))
                return "speakerId: integer expected";
        return null;
    };

    /**
     * Creates a ServerFrame message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ServerFrame
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ServerFrame} ServerFrame
     */
    ServerFrame.fromObject = function fromObject(object) {
        if (object instanceof $root.ServerFrame)
            return object;
        var message = new $root.ServerFrame();
        if (object.sequence != null)
            message.sequence = object.sequence >>> 0;
        if (object.positions) {
            if (!Array.isArray(object.positions))
                throw TypeError(".ServerFrame.positions: array expected");
            message.positions = [];
            for (var i = 0; i < object.positions.length; ++i) {
                if (typeof object.positions[i] !== "object")
                    throw TypeError(".ServerFrame.positions: object expected");
                message.positions[i] = $root.CursorPosition.fromObject(object.positions[i]);
            }
        }
        if (object.speakerId != null)
            message.speakerId = object.speakerId >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a ServerFrame message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ServerFrame
     * @static
     * @param {ServerFrame} message ServerFrame
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ServerFrame.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.positions = [];
        if (options.defaults) {
            object.sequence = 0;
            object.speakerId = 0;
        }
        if (message.sequence != null && message.hasOwnProperty("sequence"))
            object.sequence = message.sequence;
        if (message.positions && message.positions.length) {
            object.positions = [];
            for (var j = 0; j < message.positions.length; ++j)
                object.positions[j] = $root.CursorPosition.toObject(message.positions[j], options);
        }
        if (message.speakerId != null && message.hasOwnProperty("speakerId"))
            object.speakerId = message.speakerId;
        return object;
    };

    /**
     * Converts this ServerFrame to JSON.
     * @function toJSON
     * @memberof ServerFrame
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ServerFrame.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ServerFrame;
})();

module.exports = $root;
