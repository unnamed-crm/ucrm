package redisCache

import (
	"context"
	"time"

	"github.com/go-redis/cache/v8"
	"github.com/go-redis/redis/v8"
)

const (
	cacheSize int = 10000
)

type RedisCache struct {
	cachePrefix    string
	cache          *cache.Cache
	expirationTime time.Duration
}

func NewRedisCache(
	redisClient *redis.Client,
	defaultExpirationTime time.Duration,
	memcacheExpirationTime time.Duration,
	prefix string,
) *RedisCache {
	return &RedisCache{
		expirationTime: defaultExpirationTime,
		cache: cache.New(&cache.Options{
			Redis:      redisClient,
			LocalCache: cache.NewTinyLFU(cacheSize, memcacheExpirationTime),
		}),
		cachePrefix: prefix,
	}
}

func (c *RedisCache) Set(ctx context.Context, key string, value interface{}) error {
	return c.set(ctx, key, c.expirationTime, value)
}

func (c *RedisCache) set(ctx context.Context, key string, expirationTime time.Duration, value interface{}) error {
	return c.cache.Set(&cache.Item{
		Ctx:   ctx,
		Key:   key,
		Value: value,
		TTL:   expirationTime,
	})
}

func (w *RedisCache) Get(ctx context.Context, key string, value interface{}) error {
	return w.cache.Get(ctx, key, value)
}

func (w *RedisCache) Delete(ctx context.Context, key string) error {
	return w.cache.Delete(ctx, key)
}

func (w *RedisCache) Exists(ctx context.Context, key string) bool {
	return w.cache.Exists(ctx, key)
}

func (w *RedisCache) SetWithExpiration(
	ctx context.Context,
	key string,
	expirationTime time.Duration,
	value interface{},
) error {
	return w.set(ctx, key, expirationTime, value)
}
