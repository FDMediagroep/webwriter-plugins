/*
    Insert an image via file or uri.
    data either contains a File object or a url. NPImageProxy detects if
    data is a file or uri and calls the appropriate sync(=upload) method.
*/

export default function(tx, data, nodeId) {
  let isFile = data instanceof File

  if (!typeof data === 'string' && !isFile) {
    throw new Error('Unsupported data. Must be File or String')
  }

  const imageFileNode = {
    parentNodeId: nodeId,
    type: 'npfile',
    imType: 'x-im/image'
  }

  if(isFile) {
    imageFileNode['sourceFile'] = data
  } else if(typeof data === 'string') {
    imageFileNode['sourceUrl'] = data
  }

  // Create file node for the image
  let imageFile = tx.create(imageFileNode)

  tx.set([nodeId, 'imageFile'], imageFile.id)
}
