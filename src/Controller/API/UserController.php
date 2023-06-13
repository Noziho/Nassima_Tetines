<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/api/user/add', name: 'api_user_add', methods:['POST'])]
    public function addUser(Request $request): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);

        $email = $payload['email'];
        $password = $payload['password'];
        $first_name = $payload['first_name'];
        $last_name = $payload['last_name'];


        $user = (new User())
            ->setEmail($email)
            ->setPassword(password_hash($password, PASSWORD_ARGON2I))
            ->setFirstName($first_name)
            ->setLastName($last_name)
            ->setRole(['USER_ROLE'])
        ;

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $this->json([
            "status" => 200
        ]);

    }
}