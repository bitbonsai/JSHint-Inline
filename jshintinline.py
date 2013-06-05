import sublime, sublime_plugin

class JshintinlineCommand(sublime_plugin.WindowCommand):
  def run(self):
    self.window.run_command('set_build_system', {
      'file': 'Packages/JSHint Inline/JSHint-Inline.sublime-build'
    })
    self.window.run_command('build')
