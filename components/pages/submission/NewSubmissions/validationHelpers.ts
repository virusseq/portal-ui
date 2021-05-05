import { Dispatch } from 'react';

import {
  ErrorTypes,
  ReaderCallbackType,
  ValidationActionType,
  ValidationParametersType,
} from './types';


export const validationParameters = {
  oneTSV: [], // will use only the first one, but display any added
  oneOrMoreFasta: [],
  readyToUpload: false, // there's at least one TSV and one fasta
};

export const makeErrorTypeReadable = (type: ErrorTypes) => {
  switch (type) {
    case 'sampleIdInFileMissingInTsv':
      return 'Missing samples in the TSV';

    case 'sampleIdInRecordMissingInFile':
      return 'Missing samples in the Fasta';

    case 'missingHeaders':
      return 'Missing headers in the TSV';

    case 'unknownHeaders':
      return 'Unrecognized headers in the TSV';

    default: {
      console.log('Unhandled type:', type);
      return 'Error';
    }
  }
};

const overwiteIfExists = (existingFiles: File[], file: File) =>
  existingFiles.filter((old) => old.name !== file.name).concat(file);

export const validationReducer = (
  state: ValidationParametersType,
  action: ValidationActionType,
): ValidationParametersType => {
  switch (action.type) {
    case 'add tsv': {
      const oneTSV = overwiteIfExists(state.oneTSV, action.file);
      return {
        ...state,
        oneTSV,
        readyToUpload: oneTSV.length === 1 && state.oneOrMoreFasta.length > 0,
      };
    }

    case 'remove tsv': {
      const oneTSV = state.oneTSV.filter((tsv: File) => tsv.name !== action.file);
      return {
        ...state,
        oneTSV,
        readyToUpload: oneTSV.length === 1 && state.oneOrMoreFasta.length > 0,
      };
    }

    case 'add fasta': {
      const oneOrMoreFasta = overwiteIfExists(state.oneOrMoreFasta, action.file);
      return {
        ...state,
        oneOrMoreFasta,
        readyToUpload: state.oneTSV.length === 1 && oneOrMoreFasta.length > 0,
      };
    }

    case 'remove fasta': {
      const oneOrMoreFasta = state.oneOrMoreFasta.filter(
        (fasta: File) => fasta.name !== action.file,
      );
      return {
        ...state,
        oneOrMoreFasta,
        readyToUpload: state.oneTSV.length === 1 && oneOrMoreFasta.length > 0,
      };
    }

    case 'clear all':
      return validationParameters;

    default:
      console.log('dispatched nothing', action);
      return state;
  }
};

const readFile = (file: File, callback: ReaderCallbackType) => {
  const reader = new FileReader();
  reader.onabort = () => console.log('file reading was aborted');
  reader.onerror = () => console.log('file reading has failed');
  reader.onload = () => {
    callback(reader.result);
  };
  reader.readAsText(file);
};

export const getFileExtension = (file: File | string = ''): string => {
  const parsedFileName = (typeof file === 'string' ? file : file.name).toLowerCase().split('.');

  const extension = parsedFileName
    .slice(-(parsedFileName?.[parsedFileName.length - 1] === 'gz' ? 2 : 1))
    .join('.');

  return extension.includes('fa') || extension.includes('fasta') ? 'fasta' : extension;
};

export const minFiles = ({ oneTSV, oneOrMoreFasta }: ValidationParametersType): boolean =>
  !!oneTSV && oneOrMoreFasta.length > 0;

export const validator = (
  state: ValidationParametersType,
  dispatch: Dispatch<ValidationActionType>,
) => (file: File): void => {
  // TODO: create dev mode
  // console.log('validating file', file)
  // readFile(file, data => console.log(data));

  switch (getFileExtension(file)) {
    case 'tsv': {
      return dispatch({
        type: 'add tsv',
        file: file,
      });
    }

    case 'fasta': {
      return dispatch({
        type: 'add fasta',
        file: file,
      });
    }

    default: {
      return console.log(`We do not accept this type of file: ${file.name}`);
    }
  }
};

export * as validationTypes from './types';
