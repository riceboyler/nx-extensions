import { ApplicationSchema } from '../schema';
import { addProjectConfiguration, Tree } from '@nrwl/devkit';
import { getDefaultTargets } from '../../../utils/targets';
import { ProjectType } from '@nrwl/workspace';
import { addStylePluginToConfig } from '../../../stencil-core-utils';
import { join } from 'path';

export function addProject(host: Tree, options: ApplicationSchema) {
  const targets = getDefaultTargets(ProjectType.Application, options);

  addProjectConfiguration(host, options.name, {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: ProjectType.Application,
    generators: {
      '@nxext/stencil:component': {
        style: options.style,
      },
    },
    tags: options.parsedTags,
    targets,
  });

  addStylePluginToConfig(
    host,
    join(options.projectRoot, 'stencil.config.ts'),
    options.style
  );
}
