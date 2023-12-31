const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

module.exports = {
    users: prisma.users,
    profiles: prisma.profiles,
    contents: prisma.contents
}