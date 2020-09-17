import './user-controller';
import './home-controller';
import './plan-controller';
import './course-controller';
import './grades-controller';
import './curriculum-controller';

import { autoBindEntities } from '@malagu/typeorm';
import * as entities from './entity';
import { autoBind } from '@malagu/core';

autoBindEntities(entities);
export default autoBind();
