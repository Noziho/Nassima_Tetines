<?php

namespace App\Controller\API;

use App\Entity\CartItem;
use App\Repository\ProductRepository;
use App\Services\SessionCartService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CartController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $em)
    {
        $this->entityManager = $em;
    }

    #[Route('/api/cart', name: 'api_cart', methods: ['GET'])]
    public function index(SessionCartService $sessionCartService): JsonResponse
    {
        return $this->json(
            $sessionCartService->getCart(),
        );
    }

    #[Route('/api/cart/add', name: 'api_cart_add', methods: ['POST'])]
    public function addToCart(Request $request, ProductRepository $productRepository, SessionCartService $sessionCartService): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);
        if (!isset($payload['product_id']) || !isset($payload['quantity'])) {
            return $this->returnError('Missing parameters');
        }

        $product = $productRepository->find((int)$payload['product_id']);
        $quantity = (int)$payload['quantity'];
        $age = $payload['age'];
        $color = $payload['color'];
        $fontFamily = $payload['fontFamily'];
        $mouthPiece = $payload['mouthPiece'];
        $firstname = $payload['firstname'];

        if (null === $product) {
            return $this->returnError('Le produit n\'existe pas ou n\'est plus disponible');
        }

        $cart = $sessionCartService->getCart();
        $cartItem = $cart->getCartItem($product);
        /**
         * If the cartItem doesn't exist add it with quantity = 1.
         */
        if (null === $cartItem) {
            $cartItem = (new CartItem())
                ->setProduct($product)
                ->setCart($cart)
                ->setQuantity(1)
                ->setAge($age)
                ->setColor($color)
                ->setFontFamily($fontFamily)
                ->setMouthPiece($mouthPiece)
                ->setFirstName($firstname)
            ;

        } elseif ($cartItem && $cartItem->getQuantity() + $quantity <= 0) {
            $this->entityManager->remove($cartItem);
            $this->entityManager->flush();
            $this->entityManager->refresh($cart);

            return $this->json($cart);
        } /**
         * Check if the maximal quantity is respected.
         */
        elseif ($cartItem && $cartItem->getQuantity() + $quantity > 10) {
            return $this->returnError('La quantité demandé est supérieure à la quantité maximale');
        } elseif ($cartItem && $cartItem->getQuantity() + $quantity < 10) {
            $cartItem->setQuantity($cartItem->getQuantity() + $quantity);
        }

        $this->entityManager->persist($cartItem);
        $this->entityManager->flush();

        $this->entityManager->refresh($cart);

        return $this->json($cart);
    }

    public function returnError(string $message): JsonResponse
    {
        return $this->json([
            'error' => true,
            'message' => $message
        ]);
    }
}