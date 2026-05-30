import { prisma } from '../lib/prisma';

(async () => {
  try {
    const s = await prisma.siteSetting.findMany();
    console.log('site settings count:', s.length);
    const hero = s.find((x) => x.key === 'hero_title');
    console.log('hero_title:', hero?.value ?? '<none>');
  } catch (e) {
    console.error('error querying settings:', e);
  } finally {
    await prisma.$disconnect();
  }
})();
