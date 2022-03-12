package utils

import (
	"fmt"

	"github.com/ignavan39/ucrm-go/app/models"
)

// arr must be sort by order ASC
func SortPipelines(arr []models.Pipeline, oldOrder int, newOrder int, pipelineId string) ([]models.Pipeline, bool) {
	newArr := []models.Pipeline{}
	if newOrder == oldOrder {
		return arr, false
	}
	if newOrder < oldOrder {
		for _, item := range arr {
			if item.Id == pipelineId {
				n := item
				n.SetOrder(newOrder)
				newArr = append(newArr, n)
				continue

			}
			if item.GetOrder() >= newOrder && item.GetOrder() < oldOrder {
				n := item
				n.SetOrder(n.Order + 1)
				newArr = append(newArr, n)
				continue
			}
			newArr = append(newArr, item)
			fmt.Println(item.Order)
		}
	}
	if newOrder > oldOrder {
		for _, item := range arr {
			if item.Id == pipelineId {
				n := item
				n.SetOrder(newOrder)
				newArr = append(newArr, n)
				continue

			}
			if item.GetOrder() <= newOrder && item.GetOrder() > oldOrder {
				n := item
				n.SetOrder(n.Order - 1)
				newArr = append(newArr, n)
				continue
			}
			newArr = append(newArr, item)
			fmt.Println(item.Order)
		}
	}
	return newArr, true
}
