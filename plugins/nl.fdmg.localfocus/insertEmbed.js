export default function insertEmbed(tx, embedUrl) {
  tx.insertBlockNode({
    type: 'localfocus',
    dataType: 'fdmg/localfocus',
    url: embedUrl
  })
}