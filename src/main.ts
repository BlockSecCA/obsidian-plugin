import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

export interface SamplePluginSettings {
  sampleSetting: string;
}

const DEFAULT_SETTINGS: SamplePluginSettings = {
  sampleSetting: 'default'
};

export default class SamplePlugin extends Plugin {
  settings: SamplePluginSettings;

  async onload() {
    console.log('Loading Sample Plugin');
    await this.loadSettings();

    this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  onunload() {
    console.log('Unloading Sample Plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: SamplePlugin;

  constructor(app: App, plugin: SamplePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Sample Setting')
      .setDesc('A simple example setting')
      .addText(text => text
        .setPlaceholder('Enter your setting')
        .setValue(this.plugin.settings.sampleSetting)
        .onChange(async (value) => {
          this.plugin.settings.sampleSetting = value;
          await this.plugin.saveSettings();
        }));
  }
}
