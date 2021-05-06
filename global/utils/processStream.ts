/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

type StreamProcessorType = (value?: ReadableStreamDefaultReadResult<Uint8Array>) => any;

const processStream = (
  streamName = 'unnamedStreamer',
  streamReader: ReadableStreamDefaultReader<Uint8Array>,
  streamProcessor?: Function,
  receivedChunks = '',
): StreamProcessorType => ({ done, value } = {} as ReadableStreamDefaultReadResult<Uint8Array>) => {
  // TODO: create dev mode
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
    ? streamProcessor(newChunk, () => streamReader.read().then(processNext))
    : streamReader.read().then(processNext);
};

export default processStream;
