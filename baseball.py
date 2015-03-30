import re, sys, os

class Player:
	
	def __init__(self,name,bats,hits,runs):
		self.name=name
		self.bats=bats;
		self.hits=hits;
		self.runs=runs;
		self.battingavg=0

if len(sys.argv) < 2:
	sys.exit("Usage: %s filename" % sys.argv[0])
 
filename = sys.argv[1]
 
if not os.path.exists(filename):
	sys.exit("Error: File '%s' not found" % sys.argv[1])

filereader=open(filename)

#stmt=re.compile("(?P<name> \w+ \w)+ batted (?P<bats>\d) times with (?P<hits>\d) hits and (?P<runs>\d) runs")
stmt=re.compile('(\w+ \w+) batted (\d) times with (\d) hits and (\d) runs')
playerlist=[]
for line in filereader:
	#print "reaches inside main for loop"
	data=line.rstrip()
	match=stmt.match(data)
	if match is not None:
		#print match.group(1)
		#print "match is not none"
		check = "false"
		matchname= match.group(1)
		matchbats= float(match.group(2))
		matchhits= float(match.group(3))
		matchruns= float(match.group(4))
		for player in playerlist:
			#print "for loop to compute totals"
			if matchname == player.name:
				#print "if already exists"
				player.bats=float(player.bats+matchbats)
				player.hits=float(player.hits+matchhits)
				player.runs=float(player.runs+matchruns)
				check="true"
		if(check=="false"):
			newplayer=Player(matchname,matchbats,matchhits,matchruns)
			playerlist.append(newplayer)
newplayerlist=[]
for player in playerlist:
	player.battingavg=player.hits/player.bats
	#print battingavg
	newplayerlist.append(player)
	
newplayerlist= sorted(newplayerlist, key=lambda player: player.battingavg, reverse=True)

for player in newplayerlist:
	print player.name," : ",("%.3f" %round(player.battingavg,3))

filereader.close()