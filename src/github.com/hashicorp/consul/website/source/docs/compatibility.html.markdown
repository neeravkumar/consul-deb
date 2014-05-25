---
layout: "docs"
page_title: "Consul Protocol Compatibility Promise"
sidebar_current: "docs-upgrading-compatibility"
---

# Protocol Compatibility Promise

We expect Consul to run in large clusters as long-running agents. Because
upgrading agents in this sort of environment relies heavily on protocol
compatibility, this page makes it clear on our promise to keeping different
Consul versions compatible with each other.

We promise that every subsequent release of Consul will remain backwards
compatible with _at least_ one prior version. Concretely: version 0.5 can
speak to 0.4 (and vice versa), but may not be able to speak to 0.1.

The backwards compatibility must be explicitly enabled: Consul agents by
default will speak the latest protocol, but can be configured to speak earlier
ones. If speaking an earlier protocol, _new features may not be available_.
The ability for an agent to speak an earlier protocol is only so that they
can be upgraded without cluster disruption.

This compatibility guarantee makes it possible to upgrade Consul agents one
at a time, one version at a time. For more details on the specifics of
upgrading, see the [upgrading page](/docs/upgrading.html).

## Protocol Compatibility Table

<table class="table table-bordered table-striped">
<tr>
<th>Version</th>
<th>Protocol Compatibility</th>
</tr>
<tr>
<td>0.1</td>
<td>1</td>
</tr>
</table>

