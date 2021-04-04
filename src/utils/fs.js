import path from 'path';
import {lstat, readdir} from 'fs/promises';

export async function listChildren(directory, recursive) {
    const ans = {files: [], directories: []};

    const children = await readdir(directory)
        .then(children => children.map(child => path.join(directory, child)))
        .then(children => Promise.all(children.map(async entity => ({
            entity, stat: await lstat(entity)
        }))));

    for (const {entity, stat} of children) {
        if (stat.isFile()) {
            ans.files.push(entity);
        } else if (recursive) {
            const grandChildren = await listChildren(entity, true);
            ans.files = [...ans.files, ...grandChildren.files];
            ans.directories = [...ans.directories, ...grandChildren.directories];
        }
    }

    return ans;
}

export const listFiles = async (directory, recursive) => {
    const result = await listChildren(directory, recursive);
    return result.files;
}
