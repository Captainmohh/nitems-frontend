FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_URL=https://api.erp.nitda.gov.ng/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_MAINTENANCE_MODE=false
ENV NEXT_PUBLIC_MAINTENANCE_MODE=$NEXT_PUBLIC_MAINTENANCE_MODE

RUN npm run build

# ---------------------------------------
# Production stage
# ---------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# standalone output includes its own node_modules — just copy the three dirs Next.js needs
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
