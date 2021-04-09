import { useCallback, useReducer } from 'react';
import { css } from '@emotion/core';
import { useDropzone } from 'react-dropzone';

import { ButtonElement as Button } from '../../Button';
import StyledLink from '../../Link';
import ajax from '../../utils/ajax';
import { getConfig } from '../../../global/config';

// const validationParameters = {
//   oneTSV: false,
//   oneOrMoreFasta: false,
// };

const validator = (file: File) => { 
  // console.log('meep', file);
  return null;
};

// https://muse.virusseq-dataportal.ca/swagger-ui/
const NewSubmissions = () => {
  const { NEXT_PUBLIC_MUSE_API } = getConfig();
  // const [validationState, validationDispatch] = useReducer(reducer, validationParameters);

  const onDrop = useCallback(acceptedFiles => {
    console.log('accepted files', acceptedFiles);
    acceptedFiles.forEach((file: File) => {
      const extension = file.name.split('.').pop();
      console.log('test', extension)
    //   const reader = new FileReader()

    //   reader.onabort = () => console.log('file reading was aborted')
    //   reader.onerror = () => console.log('file reading has failed')
    //   reader.onload = () => {
      
    //   const binaryStr = reader.result
    //   console.log(binaryStr)
    //   // switch(true) {
    //   //   case file.type === "text/tab-separated-values": {
    //   //     validationDispatch(validateTSV());
    //   //   }

    //   // }
    //   }
    //   reader.readAsArrayBuffer(file)
    })

    // ajax
    //   .post(
    //     NEXT_PUBLIC_MUSE_API,
    //     { files: acceptedFiles }, 
    //     { headers: { } },
    //   )
    //   .then((response: { data: any }) => {
    //     console.log('response', response.data)
    //     return response.data;
    //   })
    //   .catch((err: { response: any }) => {
    //     console.error('error', err)
    //     return Promise.reject(err);
    //   });
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, validator });
  const { onClick: fileUploadClick, ...rootProps } = getRootProps();

  return (
    <article
      css={theme => css`
        flex-direction: column;

        ${isDragActive && `
          &::before {
            align-items: center;
            background: ${theme.colors.accent};
            color: ${theme.colors.white};
            content: "You may drop your files now";
            display: flex;
            font-size: 20px;
            height: 100%;
            justify-content: center;
            opacity: 0.7;
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            z-index: 1000;
          }
        `}
      `}
      {...rootProps}
    >
      <h1
        css={theme => css`
          color: ${theme.colors.primary};
          font-weight: normal;
          margin: 0 0 30px;
        `}
      >
        Start a New Submission
      </h1>

      <ol
        css={css`
          box-sizing: border-box;
          margin: 0 0 20px;
          padding-left: 15px;

          li {
            margin-bottom: 20px;
          }
        `}
      >
        <li>
          <StyledLink href={``}>Download the metadata template TSV</StyledLink>
          {' and fill in all of the fields for your samples.'}
        </li>
        <li>
          Upload one formatted metadata TSV file and the accompanying FASTA sequencing files.
          <input {...getInputProps()} />
          <Button
            css={css`
              margin: 20px 0;
            `}
            disabled={isDragActive} 
            onClick={fileUploadClick}
          >           
            Upload Files
          </Button>   
        </li>
      </ol>
    </article>
  );
};

export default NewSubmissions;
