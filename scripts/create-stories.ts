import * as admin from 'firebase-admin'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') })

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '..', 'off-the-yard-firebase-adminsdk-fbsvc-d7fadb40f7.json')

if (fs.existsSync(serviceAccountPath)) {
  try {
    const fileContent = fs.readFileSync(serviceAccountPath, 'utf8')
    if (fileContent.trim()) {
      const serviceAccount = JSON.parse(fileContent)
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        })
        console.log('✓ Initialized Firebase Admin with service account file')
      }
    }
  } catch (error: any) {
    console.warn('Failed to load service account file, using environment variables:', error.message)
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'off-the-yard'
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    
    if (!admin.apps.length) {
      if (clientEmail && privateKey) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          projectId,
        })
        console.log('✓ Initialized Firebase Admin with environment variables')
      } else {
        console.error('✗ Missing Firebase credentials')
        process.exit(1)
      }
    }
  }
} else {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'off-the-yard'
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  
  if (!admin.apps.length) {
    if (clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      })
      console.log('✓ Initialized Firebase Admin with environment variables')
    } else {
      console.error('✗ Missing Firebase credentials')
      process.exit(1)
    }
  }
}

const db = admin.firestore()

interface StoryData {
  slug: string
  title: string
  dek: string
  content: string
  category: string
  authorName: string
  publishedAt: Date
}

const stories: StoryData[] = [
  {
    slug: 'yard-gods-fleece-uniform',
    title: 'Yard Gods on building a quiet fleece uniform for the Bruhz',
    dek: 'Inside the studio where neutral palettes, heavyweight fleece, and yard memories come together in a disciplined daily uniform.',
    category: 'Spotlight',
    authorName: 'Off the Yard',
    publishedAt: new Date('2026-01-15'),
    content: `
      <p>In a small studio tucked away from the main drag, the team at Yard Gods is building something quiet. Not quiet in the sense of being unnoticed—their pieces sell out within hours—but quiet in the way that the best uniforms operate: they fade into the background of your day while elevating everything around them.</p>

      <p>"We wanted to create pieces that feel like they've always been part of your rotation," says Marcus, one of the founders. "Not statement pieces. Not conversation starters. Just... right."</p>

      <p>The "quiet uniform" philosophy runs through every decision at Yard Gods. Their latest fleece collection—heavyweight, neutral-toned, cut with precision—is designed to be worn daily without thinking. The fabric weight is substantial enough to feel intentional, but the colors are muted enough to disappear into your routine.</p>

      <h2>The Yard as Reference</h2>

      <p>For Yard Gods, the yard isn't just inspiration—it's a living archive of how clothes actually move through space. "We're not trying to recreate some romanticized version of campus life," Marcus explains. "We're looking at how people actually dress when they're moving between classes, hanging out, going to events. That's where you see real style."</p>

      <p>The fleece pieces in their latest drop reflect this. The fit is relaxed but not sloppy. The colors—charcoal, oatmeal, deep navy—are pulled directly from what Marcus calls "the yard palette": colors that work in every light, from early morning walks to late-night hangs.</p>

      <h2>Discipline in Details</h2>

      <p>What makes Yard Gods' approach unique is their commitment to restraint. "Everyone wants to add something," says co-founder Jordan. "Another pocket, another zipper, another logo placement. We're doing the opposite. We're taking things away until what's left is essential."</p>

      <p>This discipline shows in the construction. Seams are reinforced where they need to be, not where they look impressive. Zippers are YKK, chosen for reliability over branding. The fleece weight is 400gsm—heavy enough to feel substantial, not so heavy that it becomes impractical for daily wear.</p>

      <p>"The bruhz know quality when they feel it," Jordan says. "They don't need us to tell them it's good. They just need to put it on and feel the difference."</p>

      <h2>Building Without Breaking</h2>

      <p>Yard Gods operates on a drop model, but they're thinking long-term. Each piece is designed to work with previous drops, creating a cohesive wardrobe over time rather than a collection of standalone pieces.</p>

      <p>"We're not trying to reinvent the wheel every season," Marcus says. "We're refining. Making small adjustments. Building something that gets better with each release."</p>

      <p>This approach has resonated. Their last drop—the "Line Crossing" fleece set—sold out in under three hours. But instead of rushing to restock, they're taking time to ensure the next run maintains the same quality.</p>

      <p>"The moment you start cutting corners to meet demand, you lose what makes you special," Jordan explains. "We'd rather be sold out than compromise."</p>

      <h2>What's Next</h2>

      <p>Yard Gods is working on expanding their fleece line—adding new colors, refining fits based on customer feedback, and exploring new fabrications. But the core philosophy remains: build quiet pieces that feel essential.</p>

      <p>"The yard taught us that style isn't about being loud," Marcus reflects. "It's about being consistent. Showing up every day in pieces that work. That's what we're building here."</p>
    `.trim(),
  },
  {
    slug: 'probate-club-varsity-discipline',
    title: '"We wanted the yard to feel like a studio": Probate Club on varsity discipline',
    dek: 'The founders of Probate Club break down their approach to cut, color, and carrying line-crossing energy into everyday outerwear.',
    category: 'Interview',
    authorName: 'Off the Yard',
    publishedAt: new Date('2026-01-11'),
    content: `
      <p>Probate Club doesn't make clothes for people who want to blend in. Their pieces—varsity-inspired outerwear, precision-cut basics, pieces that feel both nostalgic and forward-looking—are designed for people who understand that style is a discipline.</p>

      <p>"The yard is our studio," says co-founder Alex. "Not in the literal sense, but in the way we approach it. Every detail matters. Every choice is intentional. There's no room for half-measures."</p>

      <h2>Varsity as Foundation</h2>

      <p>Probate Club's aesthetic is built on varsity traditions, but they're not doing nostalgia. Instead, they're taking the discipline and structure of varsity style and applying it to contemporary pieces.</p>

      <p>"Varsity style has rules," Alex explains. "There's a grammar to it. Colors have meaning. Cuts have purpose. We're not breaking those rules—we're understanding them deeply enough to work within them and push them forward."</p>

      <p>Their latest collection features outerwear pieces that reference varsity jackets but aren't replicas. The proportions are updated. The materials are modern. But the spirit—that sense of earned belonging, of being part of something larger—remains.</p>

      <h2>Line-Crossing Energy</h2>

      <p>One of Probate Club's core concepts is what they call "line-crossing energy"—the idea that style should feel like it's pushing boundaries without being performative about it.</p>

      <p>"There's a difference between wearing something that's 'edgy' and wearing something that actually challenges expectations," says co-founder Maya. "We want our pieces to have that energy. To feel like they're crossing lines, but quietly."</p>

      <p>This shows up in their color choices—deep burgundies, forest greens, colors that feel both traditional and unexpected. It shows up in their cuts—relaxed but structured, comfortable but precise.</p>

      <p>"The bruhz understand this," Maya continues. "They know when something feels right versus when something is trying too hard. We're designing for that understanding."</p>

      <h2>Cut and Color</h2>

      <p>Probate Club's approach to design is methodical. Every piece goes through multiple iterations. Colors are tested in different lights. Cuts are refined based on how pieces move.</p>

      <p>"We're not just making clothes," Alex says. "We're building a system. Each piece needs to work with the others. Each color needs to make sense within the palette. Each cut needs to serve a purpose."</p>

      <p>Their outerwear pieces are cut with room for layering but aren't oversized. The sleeves hit at the right length. The shoulders are structured but not stiff. Everything is considered.</p>

      <p>"Details matter," Maya emphasizes. "The way a zipper pulls. The weight of a fabric. The way a color looks in morning light versus evening light. These aren't small things. They're everything."</p>

      <h2>Building a Community</h2>

      <p>Probate Club sees their work as part of a larger conversation happening in Que-owned brands. They're not competing with other labels—they're contributing to a movement.</p>

      <p>"The yard is full of people who understand style as discipline," Alex reflects. "They're not following trends. They're building something. We want to be part of that building."</p>

      <p>Their drops are small, intentional. They're not trying to scale quickly. Instead, they're focusing on creating pieces that feel essential to the people who wear them.</p>

      <p>"When someone wears Probate Club, we want them to feel like they're part of something," Maya says. "Not because of the brand name, but because of how the pieces make them feel. That's the discipline we're talking about."</p>

      <h2>What's Next</h2>

      <p>Probate Club is working on expanding their outerwear line and exploring new categories. But the core philosophy remains: discipline, intention, line-crossing energy.</p>

      <p>"We're just getting started," Alex says. "The yard has given us so much. Now we're giving back through pieces that honor that tradition while pushing it forward."</p>
    `.trim(),
  },
  {
    slug: 'capsule-014-line-crossing',
    title: 'Inside Capsule 014: the "Line Crossing" fleece set that sold out in hours',
    dek: 'Notes from the drop, what sizes moved first, and how Yard Gods is thinking about restocks without killing the moment.',
    category: 'Drop Recap',
    authorName: 'Off the Yard',
    publishedAt: new Date('2026-01-02'),
    content: `
      <p>Yard Gods' Capsule 014 drop went live at 10 AM EST on January 2nd. By 1 PM, everything was gone.</p>

      <p>The "Line Crossing" fleece set—a heavyweight fleece hoodie and matching pants in neutral tones—was the centerpiece of the drop, and it moved faster than anything Yard Gods has released before.</p>

      <h2>The Drop</h2>

      <p>Capsule 014 consisted of three pieces: the fleece hoodie, the fleece pants, and a heavyweight tee. All in Yard Gods' signature neutral palette—charcoal, oatmeal, and deep navy.</p>

      <p>"We wanted this drop to feel cohesive," says Marcus from Yard Gods. "Not a collection of individual pieces, but a set that works together. The bruhz understood that immediately."</p>

      <p>The fleece pieces were the stars. At 400gsm, they're substantial without being overwhelming. The fit is relaxed but precise. The colors are muted but rich.</p>

      <h2>What Moved First</h2>

      <p>Size Large went first. Then Medium. Then XL. The charcoal colorway sold out before oatmeal, which surprised the team.</p>

      <p>"We thought oatmeal would be the move," Marcus admits. "It's softer, more approachable. But charcoal went first. I think people wanted something that felt more foundational, more versatile."</p>

      <p>The pants moved slightly faster than the hoodie, which suggests people were buying the set as a set. "That was the goal," Marcus says. "We wanted people to think of these pieces together, not separately."</p>

      <h2>The Response</h2>

      <p>Social media lit up immediately. People were posting photos of their orders, talking about how they'd been waiting for this drop, sharing sizing questions.</p>

      <p>"The community response was incredible," says Jordan, co-founder. "People weren't just buying—they were engaging. Asking questions. Sharing excitement. That's what we're building for."</p>

      <p>The resale market started immediately, with pieces going for 2-3x retail within hours. Yard Gods isn't thrilled about this, but they understand it's part of the game.</p>

      <p>"We'd rather people who want the pieces get them at retail," Jordan says. "But we also know that scarcity creates demand. It's a balance we're still figuring out."</p>

      <h2>Restock Strategy</h2>

      <p>The question everyone's asking: when's the restock?</p>

      <p>Yard Gods is being careful here. They don't want to kill the moment by restocking too quickly, but they also don't want to leave money on the table or frustrate their community.</p>

      <p>"We're thinking about it," Marcus says. "But we're not rushing. Quality takes time. We'd rather do it right than do it fast."</p>

      <p>The team is considering a small restock in 4-6 weeks, but nothing is confirmed. They're also exploring the idea of making certain pieces part of their permanent rotation, rather than limited drops.</p>

      <p>"The fleece pieces feel like they could be core," Jordan reflects. "They're not seasonal. They're foundational. We're thinking about how to make them more accessible without losing what makes them special."</p>

      <h2>What We Learned</h2>

      <p>Capsule 014 taught Yard Gods a few things:</p>

      <ul>
        <li><strong>Sets sell.</strong> People want cohesive pieces that work together.</li>
        <li><strong>Neutral palettes work.</strong> The muted colors resonated more than expected.</li>
        <li><strong>Quality matters.</strong> The heavyweight fleece justified the price point.</li>
        <li><strong>Community engagement is everything.</strong> The drop wasn't just a transaction—it was an event.</li>
      </ul>

      <p>"This drop validated a lot of what we've been thinking," Marcus says. "People want quality. They want pieces that feel essential. They want to be part of something. We're going to keep building on that."</p>

      <h2>What's Next</h2>

      <p>Yard Gods is already working on Capsule 015, but they're not rushing. The success of 014 has given them confidence to take their time and focus on quality.</p>

      <p>"We're not trying to capitalize on momentum," Jordan explains. "We're trying to build something lasting. That means taking time between drops, making sure each one is right."</p>

      <p>For now, the bruhz who copped Capsule 014 are wearing their pieces, posting photos, and waiting for what's next. And Yard Gods is taking notes, listening to feedback, and planning their next move.</p>

      <p>"The yard is watching," Marcus says. "We're not going to let them down."</p>
    `.trim(),
  },
  {
    slug: 'bruhz-archive-ceremonial-staples',
    title: 'Bruhz Archive and the art of making campus staples feel ceremonial',
    dek: 'From graphic balance to fabric weight, Bruhz Archive talks about honoring tradition without leaning on clichés.',
    category: 'Brands',
    authorName: 'Off the Yard',
    publishedAt: new Date('2025-12-18'),
    content: `
      <p>Bruhz Archive doesn't make statement pieces. They make essentials. But essentials that feel like they matter.</p>

      <p>"Campus staples are usually boring," says founder David. "They're functional but forgettable. We wanted to change that. We wanted to make pieces that feel ceremonial—like putting them on is part of a ritual—without being pretentious about it."</p>

      <h2>Graphic Balance</h2>

      <p>Bruhz Archive's design philosophy centers on what David calls "graphic balance"—the idea that every element on a piece needs to earn its place.</p>

      <p>"We're not anti-graphic," David explains. "We're pro-intention. If we're putting something on a piece, it needs to serve a purpose. It needs to balance with everything else. Nothing should feel random."</p>

      <p>This shows up in their tees, which feature minimal graphics placed with precision. Their hoodies use subtle branding that feels integrated rather than applied. Their outerwear pieces balance clean lines with thoughtful details.</p>

      <p>"The yard taught us that less is more," David continues. "But 'less' doesn't mean 'nothing.' It means 'exactly what's needed.' That's the balance we're chasing."</p>

      <h2>Fabric Weight</h2>

      <p>One of Bruhz Archive's signatures is their attention to fabric weight. Their tees are heavier than most. Their hoodies are substantial. Their outerwear feels intentional.</p>

      <p>"Fabric weight communicates value," David says. "Not in a 'this cost a lot' way, but in a 'this was made with care' way. When you pick up a Bruhz Archive piece, you should feel the difference immediately."</p>

      <p>Their tees use 220gsm cotton—heavy enough to feel substantial, not so heavy that they're impractical. Their hoodies are 400gsm fleece. Their outerwear uses materials chosen for durability and feel.</p>

      <p>"We're not trying to make the heaviest pieces possible," David clarifies. "We're trying to make pieces that feel right. That have presence. That communicate quality through touch, not through labels."</p>

      <h2>Honoring Tradition</h2>

      <p>Bruhz Archive draws heavily from campus traditions, but they're careful not to lean on clichés.</p>

      <p>"There's a difference between honoring tradition and copying it," David explains. "We're not making varsity jackets with our name on them. We're taking the principles—the sense of belonging, the attention to detail, the understanding that style is part of identity—and applying them to contemporary pieces."</p>

      <p>Their pieces reference campus style without replicating it. The cuts are updated. The materials are modern. But the spirit—that sense of being part of something larger—remains.</p>

      <p>"The bruhz understand this," David says. "They know when something feels authentic versus when something is trying too hard. We're designing for that understanding."</p>

      <h2>Ceremonial Without Pretense</h2>

      <p>The word "ceremonial" might sound pretentious, but David means something specific by it.</p>

      <p>"Putting on a Bruhz Archive piece should feel intentional," he explains. "Not because it's expensive or rare, but because it's well-made and considered. There's a ritual to choosing what you wear. We want our pieces to feel like they're part of that ritual."</p>

      <p>This shows up in the details. Zippers that pull smoothly. Seams that are reinforced where they need to be. Colors that work in every light. Pieces that feel like they were made for daily wear, not for special occasions.</p>

      <p>"Ceremonial doesn't mean formal," David clarifies. "It means meaningful. Our pieces should feel meaningful to wear, even if you're just going to class or hanging out on the yard."</p>

      <h2>Building Slowly</h2>

      <p>Bruhz Archive operates on a slow-growth model. They're not trying to scale quickly. Instead, they're focusing on creating pieces that feel essential.</p>

      <p>"We'd rather make fewer pieces well than more pieces poorly," David says. "Quality over quantity. That's always been our approach."</p>

      <p>Their drops are small and intentional. They're not trying to create artificial scarcity—they're just making what they can make well.</p>

      <p>"The bruhz appreciate this," David reflects. "They know we're not playing games. We're just trying to make good pieces. That authenticity matters."</p>

      <h2>What's Next</h2>

      <p>Bruhz Archive is working on expanding their line—adding new colors, refining fits, exploring new categories. But the core philosophy remains: make campus staples feel ceremonial.</p>

      <p>"We're just getting started," David says. "The yard has given us so much inspiration. Now we're giving back through pieces that honor that tradition while pushing it forward."</p>

      <p>For the bruhz who wear Bruhz Archive, the pieces are more than clothes. They're part of a ritual. Part of an identity. Part of understanding that style is discipline, and discipline is style.</p>
    `.trim(),
  },
  {
    slug: 'que-owned-scaling',
    title: 'How Que-owned brands are quietly scaling without losing the yard',
    dek: 'A look at wholesale, direct drops, and storytelling as a moat for underground Que-owned labels.',
    category: 'Business',
    authorName: 'Off the Yard',
    publishedAt: new Date('2025-12-07'),
    content: `
      <p>The underground Que-owned brand scene is having a moment. But "moment" might be the wrong word—this feels more like a movement.</p>

      <p>Brands like Yard Gods, Probate Club, Bruhz Archive, and others are building something that feels different from the typical streetwear playbook. They're scaling, but quietly. They're growing, but on their own terms. And they're doing it without losing what makes them special.</p>

      <h2>The Direct-to-Consumer Model</h2>

      <p>Most Que-owned brands start with direct drops. Limited quantities. High quality. Strong community engagement.</p>

      <p>"We're not trying to be everywhere," says Marcus from Yard Gods. "We're trying to be exactly where we need to be. That means direct drops, strong social presence, and real community engagement."</p>

      <p>The direct model allows these brands to maintain control over their narrative, pricing, and quality. But it also limits scale. So how are they growing?</p>

      <h2>Wholesale as Validation</h2>

      <p>Some brands are starting to explore wholesale, but carefully. They're choosing stockists who understand their vision, not just anyone who will buy.</p>

      <p>"Wholesale is validation," says Alex from Probate Club. "It means someone else believes in what you're building. But it also means giving up some control. We're being selective about who we work with."</p>

      <p>The brands that are doing wholesale are choosing stockists who share their values—shops that understand the yard, that get the community, that won't just put the pieces on a rack and forget about them.</p>

      <p>"We're not trying to be in every store," Alex continues. "We're trying to be in the right stores. Stores that understand what we're building."</p>

      <h2>Storytelling as a Moat</h2>

      <p>What sets Que-owned brands apart isn't just the clothes—it's the stories behind them.</p>

      <p>"The yard is our story," says David from Bruhz Archive. "Not in a marketing way, but in a real way. Everything we make comes from understanding that space, that community, that tradition."</p>

      <p>This storytelling creates a moat that's hard to replicate. You can't just copy the clothes—you have to understand the culture. You have to get the references. You have to be part of the community.</p>

      <p>"Big brands try to tap into this energy," David explains. "But they don't get it. They see the aesthetic but miss the meaning. That's our advantage."</p>

      <h2>Community as Foundation</h2>

      <p>Que-owned brands are built on community. Not community as marketing, but community as foundation.</p>

      <p>"The bruhz are our foundation," Marcus says. "They're not just customers. They're collaborators. They give us feedback. They share our pieces. They're part of what we're building."</p>

      <p>This community-first approach means these brands can scale without losing their identity. The community holds them accountable. The community keeps them honest.</p>

      <p>"We can't just make anything and expect the bruhz to buy it," Alex reflects. "They know quality. They know authenticity. They'll call us out if we're not living up to our values."</p>

      <h2>Scaling Without Selling Out</h2>

      <p>The challenge for Que-owned brands is scaling without selling out. How do you grow without losing what makes you special?</p>

      <p>"It's about staying true to your values," David says. "Not your aesthetic—your values. The aesthetic can evolve. But the values have to stay consistent."</p>

      <p>For these brands, that means:</p>

      <ul>
        <li><strong>Quality over quantity.</strong> Making fewer pieces well rather than more pieces poorly.</li>
        <li><strong>Community over scale.</strong> Building real relationships rather than just growing numbers.</li>
        <li><strong>Story over marketing.</strong> Telling real stories rather than creating narratives.</li>
        <li><strong>Values over trends.</strong> Staying true to what matters rather than chasing what's hot.</li>
      </ul>

      <h2>The Future</h2>

      <p>Que-owned brands are at an inflection point. They're growing, but they're also being watched. The question is: can they scale without losing the yard?</p>

      <p>"I think we can," Marcus says. "But it requires discipline. It requires staying true to what got us here. It requires remembering that the yard is our foundation, not our marketing angle."</p>

      <p>The brands that succeed will be the ones that maintain their connection to the community, that prioritize quality over scale, that tell real stories rather than marketing narratives.</p>

      <p>"The yard taught us that style is discipline," David reflects. "Now we're learning that business is discipline too. Stay true to your values. Build real community. Make good pieces. The rest will follow."</p>

      <p>For Que-owned brands, the future isn't about becoming the next big thing. It's about building something lasting. Something that honors the yard while pushing it forward. Something that scales without selling out.</p>

      <p>The bruhz are watching. And these brands are ready.</p>
    `.trim(),
  },
  {
    slug: 'midnight-track-pant-release',
    title: 'Night games on the yard: recap of the Midnight track pant release',
    dek: 'How a late-night drop became a community event and what it taught us about timing, community, and the power of the right moment.',
    category: 'Drop Recap',
    authorName: 'Off the Yard',
    publishedAt: new Date('2025-11-29'),
    content: `
      <p>The Midnight track pant release wasn't supposed to be a big deal. It was a small drop—one piece, three colorways, limited quantities. But sometimes the right piece at the right time becomes something more.</p>

      <p>Yard Runners dropped the Midnight track pants at 11 PM EST on a Friday night. Within two hours, everything was gone.</p>

      <h2>The Concept</h2>

      <p>The Midnight track pants were designed for movement and ceremony—two things that don't always go together, but that Yard Runners has been exploring since day one.</p>

      <p>"We wanted something you could wear to practice, to a late-night event, to just hanging out," says founder Sam. "Something that felt athletic but also intentional. Something that honored the tradition of track pants while pushing them forward."</p>

      <p>The pants feature a relaxed fit, tapered leg, and subtle details that reference athletic wear without replicating it. The fabric is a technical blend—moisture-wicking, durable, but with a hand that feels more premium than typical athletic gear.</p>

      <h2>The Drop</h2>

      <p>Yard Runners chose 11 PM for a reason. "We wanted it to feel like an event," Sam explains. "Not just another drop. Something that the bruhz could plan around, could get excited about, could make into a moment."</p>

      <p>The timing worked. Social media lit up. People were posting countdowns, sharing sizing questions, talking about which colorway they were going for.</p>

      <p>"The community made it an event," Sam says. "We just provided the piece. They provided the energy."</p>

      <h2>What Moved</h2>

      <p>Black went first. Then navy. Then charcoal. The black colorway sold out in under 30 minutes.</p>

      <p>"We thought navy would be the move," Sam admits. "It's more versatile, more approachable. But black went first. I think people wanted something that felt more foundational, more essential."</p>

      <p>Size Large moved fastest, which is typical for these drops. But Medium and XL weren't far behind. "People were buying multiple sizes," Sam says. "Either for themselves or for friends. The community was looking out for each other."</p>

      <h2>The Community Response</h2>

      <p>What made the Midnight drop special wasn't just the piece—it was how the community engaged with it.</p>

      <p>People were posting photos of their orders immediately. They were sharing sizing advice. They were talking about how they planned to style the pieces. They were making it into something bigger than just a product drop.</p>

      <p>"That's what we're building for," Sam reflects. "Not just transactions. Community. Engagement. People who care about what we're making and want to be part of it."</p>

      <h2>What We Learned</h2>

      <p>The Midnight drop taught Yard Runners a few things:</p>

      <ul>
        <li><strong>Timing matters.</strong> A late-night drop can feel like an event if you do it right.</li>
        <li><strong>Community engagement is everything.</strong> The bruhz made this drop special, not just the product.</li>
        <li><strong>Simplicity works.</strong> One piece, done well, can be more powerful than a whole collection.</li>
        <li><strong>Movement and ceremony can coexist.</strong> Athletic pieces can feel intentional, not just functional.</li>
      </ul>

      <p>"We're going to keep exploring this space," Sam says. "Movement and ceremony. Athletic and intentional. That's where Yard Runners lives."</p>

      <h2>What's Next</h2>

      <p>Yard Runners is already working on their next drop, but they're not rushing. The success of Midnight has given them confidence to take their time and focus on quality.</p>

      <p>"We're not trying to capitalize on momentum," Sam explains. "We're trying to build something lasting. That means taking time between drops, making sure each one is right."</p>

      <p>For now, the bruhz who copped the Midnight track pants are wearing them, posting photos, and waiting for what's next. And Yard Runners is taking notes, listening to feedback, and planning their next move.</p>

      <p>"The yard is watching," Sam says. "We're not going to let them down."</p>
    `.trim(),
  },
  {
    slug: 'yard-runners-movement-ceremony',
    title: 'Yard Runners on designing for movement and ceremony',
    dek: 'How one brand is reimagining athletic wear for the yard, balancing performance with intention, function with meaning.',
    category: 'Spotlight',
    authorName: 'Off the Yard',
    publishedAt: new Date('2025-11-12'),
    content: `
      <p>Yard Runners exists in a space that most brands avoid: the intersection of athletic wear and ceremonial dress. Their pieces are designed for movement, but they're also designed to feel intentional. Functional, but meaningful.</p>

      <p>"Most athletic wear is just functional," says founder Sam. "It does the job, but it doesn't mean anything. We wanted to change that. We wanted to make pieces that feel like they matter, even when you're just going for a run or heading to practice."</p>

      <h2>Movement as Foundation</h2>

      <p>Yard Runners' design philosophy starts with movement. Every piece is tested for how it moves, how it feels in motion, how it performs during actual use.</p>

      <p>"We're not making fashion pieces that look athletic," Sam explains. "We're making athletic pieces that feel intentional. There's a difference. The performance has to be real, or the ceremony doesn't matter."</p>

      <p>Their track pants are cut for movement—room in the hips, tapered leg, fabric that moves with you. Their tees are designed for activity—moisture-wicking, breathable, but with a hand that feels more premium than typical athletic gear.</p>

      <p>"The bruhz know quality when they feel it," Sam says. "They're not going to wear something that looks good but doesn't perform. We have to deliver on both fronts."</p>

      <h2>Ceremony in Details</h2>

      <p>Where Yard Runners sets itself apart is in the details. The pieces perform, but they also feel considered.</p>

      <p>"Ceremony is in the details," Sam explains. "The way a zipper pulls. The weight of a fabric. The way a seam is finished. These aren't small things. They're everything."</p>

      <p>Yard Runners' pieces feature subtle branding that feels integrated rather than applied. The colors are chosen for how they look in different lights. The cuts are refined based on how pieces move.</p>

      <p>"We're not trying to make pieces that scream 'look at me,'" Sam continues. "We're trying to make pieces that feel right. That feel intentional. That feel like they matter."</p>

      <h2>The Yard as Testing Ground</h2>

      <p>Yard Runners uses the yard as a testing ground. Their pieces are worn by athletes, by students, by people who understand that movement and ceremony can coexist.</p>

      <p>"The yard is our lab," Sam says. "We see how pieces move in real life. We get feedback from people who actually use them. We understand what works and what doesn't."</p>

      <p>This real-world testing informs everything Yard Runners does. Pieces are refined based on actual use, not just design theory.</p>

      <p>"We're not designing in a vacuum," Sam explains. "We're designing for real people doing real things. The yard gives us that connection."</p>

      <h2>Balancing Performance and Intention</h2>

      <p>The challenge for Yard Runners is balancing performance with intention. The pieces need to perform, but they also need to feel meaningful.</p>

      <p>"It's not either/or," Sam says. "It's both/and. The performance makes the ceremony possible. The ceremony makes the performance matter."</p>

      <p>This shows up in their fabric choices—technical materials that perform but feel premium. In their cuts—athletic but intentional. In their details—functional but considered.</p>

      <p>"We're not trying to make the most technical pieces possible," Sam clarifies. "We're trying to make pieces that perform well and feel intentional. That's the balance we're chasing."</p>

      <h2>Building a Community</h2>

      <p>Yard Runners sees their work as part of a larger conversation happening in Que-owned brands. They're not competing with other labels—they're contributing to a movement.</p>

      <p>"The yard is full of people who understand that movement and ceremony can coexist," Sam reflects. "They're athletes. They're students. They're people who understand that style is part of identity. We want to be part of that understanding."</p>

      <p>Their drops are small, intentional. They're not trying to scale quickly. Instead, they're focusing on creating pieces that feel essential to the people who wear them.</p>

      <p>"When someone wears Yard Runners, we want them to feel like they're part of something," Sam says. "Not because of the brand name, but because of how the pieces make them feel. That's the ceremony we're talking about."</p>

      <h2>What's Next</h2>

      <p>Yard Runners is working on expanding their line—adding new pieces, refining existing ones, exploring new categories. But the core philosophy remains: movement and ceremony.</p>

      <p>"We're just getting started," Sam says. "The yard has given us so much. Now we're giving back through pieces that honor movement while making it feel intentional."</p>

      <p>For the bruhz who wear Yard Runners, the pieces are more than athletic wear. They're part of understanding that movement can be ceremonial, that performance can be intentional, that function and meaning can coexist.</p>

      <p>"That's what we're building," Sam reflects. "Pieces that perform and matter. That move and mean. That's Yard Runners."</p>
    `.trim(),
  },
  {
    slug: 'yard-moodboard',
    title: 'How one Que-owned brand uses the yard as a living moodboard',
    dek: 'Inside the design process of a brand that sees campus not as inspiration, but as an active collaborator in their creative process.',
    category: 'Interview',
    authorName: 'Off the Yard',
    publishedAt: new Date('2025-10-30'),
    content: `
      <p>Most brands use moodboards—collections of images, colors, textures that inspire a collection. But for some Que-owned brands, the yard itself is the moodboard. Not a static collection of references, but a living, breathing source of inspiration that changes with the seasons, the time of day, the people who move through it.</p>

      <p>"We don't just look at the yard," says designer Maya from an underground Que-owned label. "We live in it. We observe it. We understand how it changes, how people move through it, how style evolves within it."</p>

      <h2>The Yard as Active Collaborator</h2>

      <p>For Maya's brand, the yard isn't just inspiration—it's an active collaborator in the design process.</p>

      <p>"We're constantly observing," Maya explains. "What colors are people wearing? How are they layering? What pieces are they reaching for? The yard tells us what's working, what's not, what's missing."</p>

      <p>This observation informs everything the brand does. Colors are chosen based on what's actually being worn, not just what looks good in a moodboard. Cuts are refined based on how pieces move in real life, not just how they look in sketches.</p>

      <p>"The yard is honest," Maya says. "It doesn't lie. If something doesn't work, you'll see it immediately. If something does work, you'll see that too. We're just paying attention."</p>

      <h2>Observing Without Copying</h2>

      <p>The challenge is observing without copying. The yard provides inspiration, but the brand has to translate that into something new.</p>

      <p>"We're not trying to replicate what we see," Maya clarifies. "We're trying to understand the principles behind it. What makes something work? What makes something feel right? That's what we're learning from the yard."</p>

      <p>This means looking beyond the surface. Not just "people are wearing oversized hoodies," but "people are wearing oversized hoodies because they want comfort and versatility." Not just "neutral colors are popular," but "neutral colors work because they're versatile and feel intentional."</p>

      <p>"The yard teaches us principles," Maya explains. "Not trends. Principles last. Trends don't."</p>

      <h2>Seasonal Changes</h2>

      <p>The yard changes with the seasons, and Maya's brand pays attention to those changes.</p>

      <p>"Fall is different from spring," Maya says. "People layer differently. Colors shift. The energy changes. We're designing for those shifts, not against them."</p>

      <p>This seasonal awareness informs the brand's release schedule. Pieces are designed with the yard's rhythm in mind, not just the fashion calendar.</p>

      <p>"We're not trying to force pieces into seasons," Maya continues. "We're trying to release pieces when they make sense for the yard. When people actually need them. When they'll actually wear them."</p>

      <h2>Real-World Testing</h2>

      <p>Maya's brand uses the yard as a testing ground. Pieces are worn by people who actually live on campus, who actually move through the yard, who actually understand how clothes work in real life.</p>

      <p>"We get feedback from real people doing real things," Maya says. "Not from focus groups or trend reports. From the bruhz who are actually wearing our pieces, who are actually living the life we're designing for."</p>

      <p>This real-world testing is invaluable. Pieces are refined based on actual use, not just design theory.</p>

      <p>"The yard tells us what works," Maya explains. "We just have to listen."</p>

      <h2>Building on Tradition</h2>

      <p>The yard has traditions, and Maya's brand honors those traditions while pushing them forward.</p>

      <p>"We're not trying to break traditions," Maya says. "We're trying to understand them. To honor them. To build on them. The yard has been doing this longer than we have. We're learning from it."</p>

      <p>This respect for tradition shows up in the brand's approach to color, cut, and construction. Pieces reference campus style without replicating it. They honor tradition while pushing it forward.</p>

      <p>"The bruhz appreciate this," Maya reflects. "They know when something feels authentic versus when something is trying too hard. We're designing for that understanding."</p>

      <h2>What We've Learned</h2>

      <p>Using the yard as a living moodboard has taught Maya's brand a few things:</p>

      <ul>
        <li><strong>Observation is everything.</strong> Pay attention to what's actually happening, not just what you think should happen.</li>
        <li><strong>Principles over trends.</strong> Understand why something works, not just that it works.</li>
        <li><strong>Real-world testing matters.</strong> Pieces need to work in actual use, not just in theory.</li>
        <li><strong>Tradition is a foundation.</strong> Honor it, understand it, build on it.</li>
      </ul>

      <p>"The yard is our teacher," Maya says. "We're just students. And we're always learning."</p>

      <h2>What's Next</h2>

      <p>Maya's brand is continuing to use the yard as a living moodboard, observing, learning, and translating what they see into pieces that feel essential.</p>

      <p>"We're not going to stop observing," Maya says. "The yard is always changing. We have to keep up. We have to keep learning. We have to keep translating what we see into pieces that matter."</p>

      <p>For Que-owned brands, the yard isn't just a place. It's a process. A way of working. A living moodboard that never stops teaching, never stops inspiring, never stops evolving.</p>

      <p>"That's what makes this special," Maya reflects. "We're not just making clothes. We're participating in something larger. The yard is our collaborator, our teacher, our inspiration. And we're grateful for it."</p>
    `.trim(),
  },
]

async function createStories() {
  console.log('Starting to create stories...')
  
  const batch = db.batch()
  const storiesRef = db.collection('stories')
  
  for (const story of stories) {
    // Check if story already exists
    const existing = await storiesRef.where('slug', '==', story.slug).limit(1).get()
    
    if (!existing.empty) {
      console.log(`Story "${story.slug}" already exists, skipping...`)
      continue
    }
    
    const docRef = storiesRef.doc()
    batch.set(docRef, {
      id: docRef.id,
      slug: story.slug,
      title: story.title,
      dek: story.dek,
      content: story.content,
      category: story.category,
      authorName: story.authorName,
      publishedAt: admin.firestore.Timestamp.fromDate(story.publishedAt),
      approved: true, // Auto-approve for template stories
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    
    console.log(`Prepared story: ${story.slug}`)
  }
  
  await batch.commit()
  console.log(`✓ Successfully created ${stories.length} stories`)
}

createStories()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error creating stories:', error)
    process.exit(1)
  })
