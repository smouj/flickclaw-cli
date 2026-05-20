FlickClaw CLI Installer

Default target:
- openclaw

Behavior:
- flickclaw install <slug>
- equivalent to flickclaw install <slug> --target openclaw

OpenClaw path behavior:
- installer respects targetPath directly
- supports both:
  - skills/<slug>/...
  - .openclaw/agents/<slug>/...

All target:
- installs all supported targets for the selected agent only
- stores all installed files in registry

Global scope:
- supported but experimental
- prefer project/workspace when possible
