type StreamProcessorType = (
  value?: ReadableStreamDefaultReadResult<Uint8Array>,
) => any;

const processStream = (
  streamName = 'unnamedStreamer',
  streamReader: ReadableStreamDefaultReader<Uint8Array>,
  streamProcessor?: Function,
  receivedChunks = '',
): StreamProcessorType => ({ done, value } = {} as ReadableStreamDefaultReadResult<Uint8Array>) => {
  // TODO: setup dev mode 
  // if (IS_DEV) { // Stream benchmarking
  //   value
  //   ? timer(streamName, 'Log')
  //   : done
  //     ? streamProcessor && timer(streamName, 'End')
  //     : timer(streamName);

  //   // troubleshooting
  //   // if (value) {
  //   //   const blah = new TextDecoder('utf-8').decode(value).split('\n');
  //   //   console.log('received new chunk', blah.length);
  //   //   console.log('new chunk, first', blah[0]);
  //   //   console.log('new chunk, last', blah[blah.length - 1]);
  //   // }
  // }

  const newChunk = new TextDecoder('utf-8').decode(value);
  const processNext = processStream(
    streamName,
    streamReader,
    streamProcessor,
    receivedChunks.concat(newChunk),
  );

  return done
    ? receivedChunks
    : value && streamProcessor
      ? streamProcessor(
        newChunk,
        () => streamReader.read()
          .then(processNext),
      )
      : streamReader.read()
        .then(processNext);
};

export default processStream;