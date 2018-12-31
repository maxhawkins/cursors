import * as $protobuf from "protobufjs";
/** RPCType enum. */
export enum RPCType {
    UNKNOWN = 0,
    SPEAK = 1,
    BYE = 2
}

/** Properties of a RPC. */
export interface IRPC {

    /** RPC type */
    type?: (RPCType|null);

    /** RPC payload */
    payload?: (Uint8Array|null);
}

/** Represents a RPC. */
export class RPC implements IRPC {

    /**
     * Constructs a new RPC.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRPC);

    /** RPC type. */
    public type: RPCType;

    /** RPC payload. */
    public payload: Uint8Array;

    /**
     * Creates a new RPC instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RPC instance
     */
    public static create(properties?: IRPC): RPC;

    /**
     * Encodes the specified RPC message. Does not implicitly {@link RPC.verify|verify} messages.
     * @param message RPC message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRPC, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RPC message, length delimited. Does not implicitly {@link RPC.verify|verify} messages.
     * @param message RPC message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRPC, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RPC message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RPC;

    /**
     * Decodes a RPC message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RPC
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RPC;

    /**
     * Verifies a RPC message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RPC message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RPC
     */
    public static fromObject(object: { [k: string]: any }): RPC;

    /**
     * Creates a plain object from a RPC message. Also converts values to other types if specified.
     * @param message RPC
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RPC, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RPC to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a SpeakRequest. */
export interface ISpeakRequest {

    /** SpeakRequest speaking */
    speaking?: (boolean|null);
}

/** Represents a SpeakRequest. */
export class SpeakRequest implements ISpeakRequest {

    /**
     * Constructs a new SpeakRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISpeakRequest);

    /** SpeakRequest speaking. */
    public speaking: boolean;

    /**
     * Creates a new SpeakRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SpeakRequest instance
     */
    public static create(properties?: ISpeakRequest): SpeakRequest;

    /**
     * Encodes the specified SpeakRequest message. Does not implicitly {@link SpeakRequest.verify|verify} messages.
     * @param message SpeakRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISpeakRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SpeakRequest message, length delimited. Does not implicitly {@link SpeakRequest.verify|verify} messages.
     * @param message SpeakRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISpeakRequest, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SpeakRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SpeakRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SpeakRequest;

    /**
     * Decodes a SpeakRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SpeakRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SpeakRequest;

    /**
     * Verifies a SpeakRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SpeakRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SpeakRequest
     */
    public static fromObject(object: { [k: string]: any }): SpeakRequest;

    /**
     * Creates a plain object from a SpeakRequest message. Also converts values to other types if specified.
     * @param message SpeakRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SpeakRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SpeakRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CursorPosition. */
export interface ICursorPosition {

    /** CursorPosition x */
    x?: (number|null);

    /** CursorPosition y */
    y?: (number|null);

    /** CursorPosition userId */
    userId?: (number|null);

    /** CursorPosition timestampMs */
    timestampMs?: (number|Long|null);
}

/** Represents a CursorPosition. */
export class CursorPosition implements ICursorPosition {

    /**
     * Constructs a new CursorPosition.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICursorPosition);

    /** CursorPosition x. */
    public x: number;

    /** CursorPosition y. */
    public y: number;

    /** CursorPosition userId. */
    public userId: number;

    /** CursorPosition timestampMs. */
    public timestampMs: (number|Long);

    /**
     * Creates a new CursorPosition instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CursorPosition instance
     */
    public static create(properties?: ICursorPosition): CursorPosition;

    /**
     * Encodes the specified CursorPosition message. Does not implicitly {@link CursorPosition.verify|verify} messages.
     * @param message CursorPosition message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICursorPosition, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CursorPosition message, length delimited. Does not implicitly {@link CursorPosition.verify|verify} messages.
     * @param message CursorPosition message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICursorPosition, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CursorPosition message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CursorPosition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CursorPosition;

    /**
     * Decodes a CursorPosition message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CursorPosition
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CursorPosition;

    /**
     * Verifies a CursorPosition message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CursorPosition message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CursorPosition
     */
    public static fromObject(object: { [k: string]: any }): CursorPosition;

    /**
     * Creates a plain object from a CursorPosition message. Also converts values to other types if specified.
     * @param message CursorPosition
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CursorPosition, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CursorPosition to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ClientFrame. */
export interface IClientFrame {

    /** ClientFrame sequence */
    sequence?: (number|null);

    /** ClientFrame position */
    position?: (ICursorPosition|null);
}

/** Represents a ClientFrame. */
export class ClientFrame implements IClientFrame {

    /**
     * Constructs a new ClientFrame.
     * @param [properties] Properties to set
     */
    constructor(properties?: IClientFrame);

    /** ClientFrame sequence. */
    public sequence: number;

    /** ClientFrame position. */
    public position?: (ICursorPosition|null);

    /**
     * Creates a new ClientFrame instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ClientFrame instance
     */
    public static create(properties?: IClientFrame): ClientFrame;

    /**
     * Encodes the specified ClientFrame message. Does not implicitly {@link ClientFrame.verify|verify} messages.
     * @param message ClientFrame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IClientFrame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ClientFrame message, length delimited. Does not implicitly {@link ClientFrame.verify|verify} messages.
     * @param message ClientFrame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IClientFrame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ClientFrame message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ClientFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ClientFrame;

    /**
     * Decodes a ClientFrame message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ClientFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ClientFrame;

    /**
     * Verifies a ClientFrame message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ClientFrame message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ClientFrame
     */
    public static fromObject(object: { [k: string]: any }): ClientFrame;

    /**
     * Creates a plain object from a ClientFrame message. Also converts values to other types if specified.
     * @param message ClientFrame
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ClientFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ClientFrame to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a ServerFrame. */
export interface IServerFrame {

    /** ServerFrame sequence */
    sequence?: (number|null);

    /** ServerFrame positions */
    positions?: (ICursorPosition[]|null);

    /** ServerFrame speakerId */
    speakerId?: (number|null);
}

/** Represents a ServerFrame. */
export class ServerFrame implements IServerFrame {

    /**
     * Constructs a new ServerFrame.
     * @param [properties] Properties to set
     */
    constructor(properties?: IServerFrame);

    /** ServerFrame sequence. */
    public sequence: number;

    /** ServerFrame positions. */
    public positions: ICursorPosition[];

    /** ServerFrame speakerId. */
    public speakerId: number;

    /**
     * Creates a new ServerFrame instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ServerFrame instance
     */
    public static create(properties?: IServerFrame): ServerFrame;

    /**
     * Encodes the specified ServerFrame message. Does not implicitly {@link ServerFrame.verify|verify} messages.
     * @param message ServerFrame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IServerFrame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ServerFrame message, length delimited. Does not implicitly {@link ServerFrame.verify|verify} messages.
     * @param message ServerFrame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IServerFrame, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ServerFrame message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ServerFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ServerFrame;

    /**
     * Decodes a ServerFrame message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ServerFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ServerFrame;

    /**
     * Verifies a ServerFrame message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ServerFrame message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ServerFrame
     */
    public static fromObject(object: { [k: string]: any }): ServerFrame;

    /**
     * Creates a plain object from a ServerFrame message. Also converts values to other types if specified.
     * @param message ServerFrame
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ServerFrame, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ServerFrame to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
