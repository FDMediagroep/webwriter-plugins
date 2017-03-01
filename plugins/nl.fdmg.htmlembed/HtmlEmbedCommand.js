import {WriterCommand} from 'writer';
import OpenEmbedDialog from './openEmbedDialog';

class HtmlEmbedCommand extends WriterCommand {
  execute() {
    OpenEmbedDialog({});
  }
}

export default HtmlEmbedCommand;
