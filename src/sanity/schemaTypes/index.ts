import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { postType } from './postType'
import { categoryType } from './categoryType'
import { authorType } from './authorType'
import { campusType } from './campusType'
import { studyProgramType } from './studyProgramType'
import { scholarshipType } from './scholarshipType'
import { brochureType } from './brochureType'
import { pageType } from './pageType'
import { memberType } from './memberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    postType,
    categoryType,
    authorType,
    campusType,
    studyProgramType,
    scholarshipType,
    brochureType,
    pageType,
    memberType,
  ],
}

export {
  blockContentType,
  postType,
  categoryType,
  authorType,
  campusType,
  studyProgramType,
  scholarshipType,
  brochureType,
  pageType,
  memberType,
}
