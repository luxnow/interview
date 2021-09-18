import { IncomingMessage, ServerResponse } from 'http';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import Shot, { Listener, RequestOptions, ResponseObject} from '@hapi/shot';

let dispatcher: any;

export default function init(options: {
  dispatcher: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse) => void;
}): void {
  dispatcher = options.dispatcher;
}

export async function http(options: RequestOptions): Promise<ResponseObject> {
  if (!dispatcher) {
    throw new Error('Dispatcher hasn\'t been initialized');
  }

  return Shot.inject(dispatcher, options);
}
