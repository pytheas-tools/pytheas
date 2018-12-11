workflow "New workflow" {
  on = "push"
  resolves = ["Build APP UI"]
}

action "Build APP UI" {
  uses = "actions/npm@6309cd9"
  runs = "build:app:ui"
}
