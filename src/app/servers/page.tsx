import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Search, Filter, Globe, Users, Clock, SignalLow, SignalHigh, Zap } from "lucide-react";

export default function ServersPage() {
  const servers = [
    { id: 1, name: "Rust365 US MAIN - WEEKLY WIPE", players: "348/350", region: "US-EAST", type: "Official", ping: "12ms", uptime: "99.9%", age: "2d" },
    { id: 2, name: "Bloody Rust 10x - NO BPS", players: "198/200", region: "US-WEST", type: "Modded", ping: "45ms", uptime: "98.2%", age: "12h" },
    { id: 3, name: "Survivor Island 2x Solo/Duo/Trio", players: "145/150", region: "EU-WEST", type: "Community", ping: "112ms", uptime: "99.5%", age: "4d" },
    { id: 4, name: "Stevie's 1000x Battlefield", players: "88/100", region: "US-CENTRAL", type: "Modded", ping: "32ms", uptime: "97.1%", age: "1d" },
    { id: 5, name: "Facepunch US 1", players: "350/350", region: "US-EAST", type: "Official", ping: "15ms", uptime: "100%", age: "14d" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-black text-white tracking-tighter uppercase italic">
            Server <span className="text-primary">Directory</span>
          </h1>
          <p className="text-muted-foreground">Monitoring 4,215 live servers across the globe.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 glass-panel border-white/10" placeholder="Search servers..." />
          </div>
          <Button variant="outline" className="border-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Players", val: "142,521", icon: Users },
          { label: "Active Servers", val: "4,215", icon: Globe },
          { label: "Official Nodes", val: "1,204", icon: Clock },
          { label: "Community Nodes", val: "3,011", icon: Zap },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 space-y-1">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-headline font-black text-white tracking-tighter">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Server Name</TableHead>
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Players</TableHead>
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Region</TableHead>
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Type</TableHead>
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Age</TableHead>
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground">Ping</TableHead>
              <TableHead className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground text-right">Connect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                <TableCell className="py-6">
                  <div className="space-y-1">
                    <p className="font-headline font-bold text-white group-hover:text-primary transition-colors">{server.name}</p>
                    <div className="flex gap-2">
                       <Badge variant="secondary" className="text-[8px] h-4 bg-primary/10 text-primary border-primary/20">WEEKLY</Badge>
                       <Badge variant="secondary" className="text-[8px] h-4 bg-white/5 text-muted-foreground border-white/10">MAP: 4500</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-white">{server.players}</TableCell>
                <TableCell className="text-muted-foreground text-sm uppercase font-bold tracking-tighter">{server.region}</TableCell>
                <TableCell>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    server.type === 'Official' ? 'bg-red-600/20 text-red-500' : 
                    server.type === 'Modded' ? 'bg-purple-600/20 text-purple-500' : 
                    'bg-blue-600/20 text-blue-500'
                  }`}>
                    {server.type}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{server.age}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {parseInt(server.ping) < 30 ? <SignalHigh className="w-4 h-4 text-green-500" /> : <SignalLow className="w-4 h-4 text-orange-500" />}
                    <span className="text-xs font-mono">{server.ping}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" className="rust-gradient font-headline text-xs h-8">CONNECT</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
