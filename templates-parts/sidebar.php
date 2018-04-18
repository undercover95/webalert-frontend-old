<div class="sidebar bg-dark">
  <div class="list-group">
    <a href="/monitor_stron" class="list-group-item list-group-item-action<?php if($active_id == 0) echo " active"; ?>">
      <i class="fa fa-home" aria-hidden="true"></i> Kokpit
    </a>
    <a href="addPage.php" class="list-group-item list-group-item-action<?php if($active_id == 1) echo " active"; ?>">
        <i class="fa fa-plus-circle" aria-hidden="true"></i> Dodaj witrynę
    </a>
    <a href="http://dnscheck.pingdom.com/" target="_blank" class="list-group-item list-group-item-action">
      <i class="fa fa-cogs" aria-hidden="true"></i> Testuj witrynę<br><small>(DNS Checker)</small>
    </a>
    <a href="settings.php" class="list-group-item list-group-item-action<?php if($active_id == 2) echo " active"; ?>">
      <i class="fa fa-wrench" aria-hidden="true"></i> Ustawienia
    </a>
    <a href="reports.php" class="list-group-item list-group-item-action<?php if($active_id == 3) echo " active"; ?>">
      <i class="fa fa-bullhorn" aria-hidden="true"></i> Raporty <span class="badge badge-danger">5</span>
    </a>
    <a href="stats.php" class="list-group-item list-group-item-action<?php if($active_id == 4) echo " active"; ?>">
      <i class="fa fa-pie-chart" aria-hidden="true"></i> Statystyki</a>
    </a>
  </div>
</div>
<button id="hide-sidebar-btn" title="Pokaż/ukryj boczny panel" class="btn btn-primary btn-sm text-center">
  <i class="fa fa-bars" aria-hidden="true"></i> <i class="fa fa-eye-slash" aria-hidden="true"></i>
</button>